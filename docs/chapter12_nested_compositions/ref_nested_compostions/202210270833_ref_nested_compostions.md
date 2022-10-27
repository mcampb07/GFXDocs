---
tags:
  - nested
  - compositions
  - reference
---


<!--
Title : ref_nested_compostions
- Created : 2022-10-27
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

!!! info "Article Updated"
    Thu 27 Oct 2022 08:38:19 BST
# Reference - Nested Compositions and Versio Graphics

!!! success
    This new feature will be part of the Versio 4.7 GA. Requirments are versio-graphics 20.0.0.427, realtime-object-scripts 2.1.0.47

- [VMGMT-11957](https://imaginecommunications.atlassian.net/browse/VMGMT-11957)

We need to process Nested Composition information from a jsx file and render a Nested Composition with its transformations applied and with areas outside the composition being masked away.

Create an example of a Nested Composition, which includes some graphical object that extends beyond the edge of the screen. Include that composition in another composition to make it nested. Make sure the areas outside the screen are not visible.

Apply transformations to a nested composition (i.e. scaling, rotating) and make sure that works.

Internal video only :

<iframe src="https://player.vimeo.com/video/764452072?h=18566bb65f" width="640" height="480" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
