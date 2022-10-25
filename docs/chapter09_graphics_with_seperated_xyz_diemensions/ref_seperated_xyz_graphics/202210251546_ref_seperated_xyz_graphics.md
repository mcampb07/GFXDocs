---
tags:
  - xyz
  - separation 
  - realtime
---


<!--
Title : ref_seperated_xyz_graphics
- Created : 2022-10-25
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

!!! info "Article Updated"
    Tue 25 Oct 2022 15:46:35 BST

# Reference - Support Separated XYZ dimensions

- [POGM-2851](https://imaginecommunications.atlassian.net/browse/POPGM-2851)
- [CO-1281](https://imaginecommunications.atlassian.net/browse/CO-1281)

Customer is looking for adding the support of sperate dimension in layers where user need to be able to control X and Y dimension separately.

Currently the Real Time Object Script only captures keyframes when X and Y transformations are combined. Customers would like to capture these keyframe transforms independently and ability to have expression on the separate dimensions. This provide support for better easing, acceleration and curves to produce smoother animations. If the customer sets "Separate Dimensions" in After Effect our script does not log the keyframe transformations. It should also support X,Y,Z when available.

Video for internal review only. 

<iframe src="https://player.vimeo.com/video/763866617?h=5b95e237cc" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
