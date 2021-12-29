{     
    function GenerateKeyframes(property, propertyName) {
        property.selected = true;
        property.expression = propertyName;
        app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
    }

    function Compare3DArray(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }

    function GetCompMarkerFrames() {
        var tempNull = app.project.activeItem.layers.addNull(app.project.activeItem.duration);
        var tempPos = tempNull.property("ADBE Transform Group").property("ADBE Position");
        tempPos.expression = "x = thisComp.marker.numKeys;[x,0];";
        var result = tempPos.value[0];
        
        var markerFrames = [];
        
        for (x = 1; x <= result; x++) {
            tempPos.expression = "x = timeToFrames(thisComp.marker.key(" + x + ").time);[x,0];";
            markerFrames.push(tempPos.value[0]);
        }
    
        tempNull.remove();
    
        return markerFrames;
    }

    function CheckForCompMarker(markers, frame) {
        for (i = 0; i < markers.length; i++) {
            if (markers[i] == frame) {
                return true;
            }
        }
        return false;
    }
    
    function WriteLayerDVEInfo(layer, zIndex) {
        try {
            var data = "DVE Info\n";
            data += layer.name + "\n";
            data += "ScalerName=" + layer.name + "\n";
            data += "FrameDuration=" + app.project.activeItem.frameDuration + "\n";
            data += "zIndex=" + zIndex + "\n";
            
            app.beginUndoGroup("Get DVE Info");
            
            // Generate a keyframe every frame
            GenerateKeyframes(layer.anchorPoint, 'transform.anchorPoint');
            GenerateKeyframes(layer.position, 'transform.position');
            GenerateKeyframes(layer.scale, 'transform.scale');
            GenerateKeyframes(layer.opacity, 'transform.opacity');
            
            var numKeys = layer.anchorPoint.numKeys;
            if (layer.position.numKeys != numKeys || layer.scale.numKeys != numKeys || layer.opacity.numKeys != numKeys) {
                alert("Something went wrong -- the number of generated keys is different for the different properties.");
                return;
            }
            
            var markerFrames = GetCompMarkerFrames();
            
            var topLeftPrev;
            var bottomRightPrev;
            var opacityPrev;
            for (var i = 1; i <= numKeys; i++) {
                var position = layer.position.keyValue(i);
                var anchorPoint = layer.anchorPoint.keyValue(i);
                var scale = layer.scale.keyValue(i);
                var topLeft = [position[0] - anchorPoint[0]*scale[0]/100, position[1] - anchorPoint[1]*scale[1]/100, position[2] - anchorPoint[2]*scale[2]/100];
                var bottomRight = [topLeft[0] + layer.width*scale[0]/100, topLeft[1] + layer.height*scale[1]/100, topLeft[2]];
                var opacity = layer.opacity.keyValue(i);
                
                if (i === 1 || !Compare3DArray(topLeftPrev, topLeft) || !Compare3DArray(bottomRightPrev, bottomRight) || opacityPrev != opacity || CheckForCompMarker(markerFrames, i-1)) {
                    data += "{" + (i-1) + "," + topLeft.toString() + "," + bottomRight.toString() + "," + opacity + "}\n";  
                }
            
                topLeftPrev = topLeft;
                bottomRightPrev = bottomRight;
                opacityPrev = opacity;
            }
            
            app.endUndoGroup();
            // Remove the generated keyframes
            app.executeCommand(app.findMenuCommandId("Undo Get DVE Info"));
            
            // Add info to layer marker
            app.beginUndoGroup("Add DVE Info to Layer Marker");
            var marker = new MarkerValue(data);
            layer.property("Marker").setValueAtTime(0, marker);
            layer.enabled = false;
            app.endUndoGroup();
        } catch(e) {
            alert(e.toString());
        }
    }
    
    function WriteAllDVEInfo()
    {  
        var comp = app.project.activeItem;
        
        // order graphics based on first non-DVE layer, give it zIndex of 0
        var zIndex = -2;
        var dveaLayerHit = false;
        var dvebLayerHit = false;
        var graphicsLayerHit = false;
        for (var i = 1; i <= comp.numLayers; i++) {
            if (!dveaLayerHit && comp.layers[i].name === "DVE A") {
                WriteLayerDVEInfo(comp.layers[i], zIndex);
                dveaLayerHit = true;
                zIndex++;
            } else if (!dvebLayerHit && comp.layers[i].name === "DVE B") {
                WriteLayerDVEInfo(comp.layers[i], zIndex);
                dvebLayerHit = true;
                zIndex++;
            } else if (!graphicsLayerHit) {
                graphicsLayerHit = true;
                zIndex = 1;
            }
        }
    }

    WriteAllDVEInfo();
}