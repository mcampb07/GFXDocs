---
tags:
  - expressions
  - ctc
  - triggers
---


<!--
Title : ref_expressions_and_triggers
- Created : 2022-10-25
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

!!! info "Article Updated"
    Tue 25 Oct 2022 18:18:42 BST
# Expressions working with triggers

- [POPGM-2852](https://imaginecommunications.atlassian.net/browse/POPGM-2852)

We need to have the ability to fire CTC triggers based on result of an AE expression under multiple conditions. This will allow customers to evaluate the input of real time tags and other layer properties then fire a named trigger when the condition is met. The named trigger (already in product) can be used to do things like fire a salvo/macro or unpause an animation.

Graphics will be able to change or show/hide different objects based on conditions within a single graphic. Triggers can respond on any layer where the layout is loaded. 

Examples Use Case:
- If the value of a RT time text object is “Sauce” then fire named trigger “Spaghetti”.
- The countdown time remaining is greater than 00:00:05 set value Opacity = 100. Else, Opacity=0 and fire trigger “Spaghetti”
- If a value from a data source tied to a RT Text item is “Sauce” then fire named trigger “Spaghetti”

Internal video for review

<iframe src="https://player.vimeo.com/video/763862097?h=6ebc267573" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
