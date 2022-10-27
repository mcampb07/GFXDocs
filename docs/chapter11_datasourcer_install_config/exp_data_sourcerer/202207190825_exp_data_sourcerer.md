---
tags:
   - data sourcerer
   - explain
---
<!--
Title : exp_data_sourcerer
- Created : 2022-07-19
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : 
-->

!!! info "Article Updated"
    Thu 27 Oct 2022 16:28:22 BST

# About Data Sourcerer

What you will understand after reading this article:
- What is Data Sourcerer as an overview
- How to set the infrastructure for Data Sourcerer
- What the Differing Data Sourcerer sources are
- How the end goal of RTO elements within a layout are then using the datasets from Data Sourcerer

## Data Sourcerer - What is it?
 
The `Data Sourcerer` (fyi I am not a fan of the name, sourcerer... looks wrong!) is a Versio graphics data sourcing solution that replaces the Data Gatherer.

Data Sourcerer (DS) was introduced to Versio in version 4.3.5.

It  is a service that manages data source content for Versio Platform graphics. It works on a registration and pull model, with each of your data sources registered and then pulled in response to "pull" commands in your graphic animations. Data sources are registered using Powershell script files that you can customize and run as required

A selection of sample scripts are provided with the Data Sourcerer installation packages. You can also find samples in the Versio System Operations Technical Guide. 

## Where is it?
Data Sourcerer is installed on the Windows based `Core Services` instances. If you have an `HA` environment, then you will be load balancing connections from the Versio Graphics engines to the `Data Sourcerers`
