# Maternal-Mortality-Rates #

## Project Overview: ##


For this project, we developed an interactive dashboard for users to explore maternal mortality data globally and within the United States. Users will be able to visualize maternal mortality data alongside data for potentially related factors, such as access to health insurance and Medicaid.
We’re focusing on factors at the state level because maternal mortality rates and healthcare policies and access vary widely between states.

## Purpose of Project: ##


The United States has the highest maternal mortality rate among 11 developed countries, and has seen rising deaths from 1987-2017 [source](https://www.ajmc.com/view/us-ranks-worst-in-maternal-care-mortality-compared-with-10-other-developed-nations).  We discovered that as of 2017, Medicaid coverage was responsible for financing 43% of U.S. births. 
Covered medical services and income eligibility for Medicaid varies by state.
Compared with any other wealthy nation, the United States spends the highest percentage of its gross domestic product on health care.


## Obectives ##


Our obejective is for this dashboard to function in a way that allows for users to see patterns between maternal mortality rates and potential influencing factors.
For example, Does health insurance coverage affect maternal mortality rates? Does a state’s medicaid expansion affect maternal mortality rates?


## Data Sources Used: ##

The data for this project was sourced from the following sources:

1.UNICEF [Source](https://data.unicef.org/topic/maternal-health/maternal-mortality/)
2.Insurance Coverage Data showing changes in Insurance Policy over time: [Insurance Coverage Data](https://www.kff.org/womens-health-policy/fact-sheet/womens-health-insurance-coverage-fact-sheet)
3.Centers for Disease Control Wonder [source](https://wonder.cdc.gov/)
4.American Health Rankings: United Health Foundation
5.Medicaid Expansion [source](Data.Medicaid.gov state medicaid expansion and application data) 


## Data Processing & ETL: ##

**Extract**

-UNICEF
Downloaded the latest data for Maternal Mortality Worldwide (2017).

-Centers for Disease Control Wonder
Data on maternal deaths from 2009-19 in the US: death counts was queried on specific ICD codes for maternal deaths up to 42 days after delivery and late maternal deaths (defined by the WHO as death of a woman from direct or indirect obstetric causes).

-Kaiser Family Foundation
Pulled health insurance coverage in the US for females aged 19-64 in the years 2009-2019.

-America's Health Rankings: United Health Foundation
Pulled report for overall health of women and children for 2019 as well as overall health outcomes by US state for years 2009-19.

**Transform**

Using Jupyter Notebook/Pandas, we read the downloaded CSVs into a dataframe format.  We then merged the CDC dataframes from different years together on shared columns, and added an additional columnn comparing deaths to number of births.  Next we cleaned the Kaiser Family data by removing null values, converted needed values to percentages, built new dataframes with an added column for years, and concatenated seperate dataframes into one.  Then we reviewed the data of the America's Health Rankings for relevant measures and eliminated others, seperating demographic breakdowns where available into indiviudal CSVs, modified column names to better load into PostGres.  Lastly, we cleaned the UNICEF data by adding columns in for latitude and longitude of the countries, based on location column, split item into two parts and then removed unneeded columns.

**Analysis**


**Load**

Within Jupyter Notebook, exported cleaned CSVs into PostGres as tables in a unified database.
Set an object and declare base in SQLAlchemy.
Created table schemes corresponding to the individual CSV files.
Created an engine and connection to the Postgres database and created the tables.
A similar process was followed to create a local database: connection was made to SQLite file, tables were specified to be loaded, created, and binded to the local database.

## 


## Flask Web Application: ##
Web application is deployed on Heroku: [Maternal Mortality Heroku App](https://maternal-mortality-project.herokuapp.com/)
Source code is available on GitHub: [GitHub Source Code](https://github.com/abpuccini/project2-maternal-mortality)


 ## Libraries & Tools Used: ##
 Python Version 3.6
 Juypter Notebook
 Pandas
 PostgresSQL
 Flask
 Plotly

