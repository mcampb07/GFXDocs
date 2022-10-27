---
tags:
   - data sourcerer
   - external data
   - data
---

<!--
Title : 2083402020_what_is_data_sourcerer_explanation

- Created : 2021-12-29 18:09
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- Versio 4.5 GA Engineering Guide
	- Veriso 4.5 GA Systems Operations
- Author Notes :
-->

!!! info "Article Updated"
    Thu 27 Oct 2022 13:15:42 BST

# Data Sourcerer

What is Data Sourcerer?

The `Data Sourcerer` (fyi I am not a fan of the name, sourcerer... looks wrong!) is a Versio graphics data sourcing solution that replaces the Data Gatherer.

![](attachments/Pasted%20image%2020211229181508.png)

Data Sourcerer (DS) was introduced to Versio in version 4.3.5.

It is a service that manages data source content for Versio Platform graphics. It works on a registration and pull model, with each of your data sources registered and then pulled in response to "pull" commands in your graphic animations. Data sources are registered using Powershell script files that you can customize and run as required.

A selection of sample scripts are provided with the Data Sourcerer installation packages.

DS provides unicode support, better integration with current generation software and higher performance. The unicode support allows for more diverse language requirements that expands the graphics functionality for different regions of the world.

The `Data Sourcerer` supports four different data providers in the 4.5 release:

-   CSV: A text file with each line representing a data record. Each record contains all the field values for that record, separated by a delimiter such as a comma or a colon.
-   RSS: A web feed whose structure conforms to the RSS standard.
-   TXT: A text file with each line representing an entire field value.
-   SQL: An SQL database defined by a T-SQL query. Verified with MSSQL databases and SQLite file-based sources.

Data Sourcerer is part of the `Advanced License Graphics Pack`.
