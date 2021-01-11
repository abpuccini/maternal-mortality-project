# Maternal-Mortality-Rates #

## Project Overview ##


For this project, we developed an interactive dashboard for users to explore maternal mortality data globally and within the United States. Users will be able to visualize maternal mortality data alongside data for potentially related factors, such as access to health insurance and Medicaid.
We’re focusing on factors at the state level because maternal mortality rates and healthcare policies and access vary widely between states.

## Purpose of Project ##


The United States has the highest maternal mortality rate among 11 developed countries, and has seen rising deaths from 1987-2017 [source](https://www.ajmc.com/view/us-ranks-worst-in-maternal-care-mortality-compared-with-10-other-developed-nations).  Compared with any other wealthy nation, the United States spends the highest percentage of its gross domestic product on health care.  We discovered that as of 2017, Medicaid coverage was responsible for financing 43% of U.S. births but covered medical services and income eligibility for Medicaid varied by state.  We wanted to explore by state if these variations affect maternal mortality rates.



## Obectives ##


Our obejective is for this dashboard to function in a way that allows for users to see patterns between maternal mortality rates and potential influencing factors.
For example, Does health insurance coverage affect maternal mortality rates? Does a state’s medicaid expansion affect maternal mortality rates?


## Data Sources Used ##

The data for this project was sourced from the following sources:

1.UNICEF [Source](https://data.unicef.org/topic/maternal-health/maternal-mortality/)

2.Insurance Coverage Data showing changes in Insurance Policy over time: [Source](https://www.kff.org/womens-health-policy/fact-sheet/womens-health-insurance-coverage-fact-sheet)

3.Centers for Disease Control Wonder [Source](https://wonder.cdc.gov/)

4.American Health Rankings: United Health Foundation [Source](https://www.americashealthrankings.org/explore/annual/measure/Outcomes/state/ALL)

5.Medicaid Expansion [Source](https://data.medicaid.gov/Enrollment/State-Medicaid-and-CHIP-Applications-Eligibility-D/n5ce-jxme/data) 


## Data Processing & ETL: ##

**Extract**

- UNICEF
Downloaded the latest data for Maternal Mortality Worldwide (2017).

- Centers for Disease Control Wonder
Data on maternal deaths from 2009-19 in the US: death counts was queried on specific ICD codes for maternal deaths up to 42 days after delivery and late maternal deaths (defined by the WHO as death of a woman from direct or indirect obstetric causes).

- Kaiser Family Foundation
Pulled health insurance coverage in the US for females aged 19-64 in the years 2009-2019.

- America's Health Rankings: United Health Foundation
Pulled report for overall health of women and children for 2019 as well as overall health outcomes by US state for years 2009-19.

**Transform**

- Using Jupyter Notebook/Pandas, we read the downloaded CSVs into a dataframe format.  We then merged the CDC dataframes from different years together on shared columns, and added an additional columnn comparing deaths to number of births.  Next we cleaned the Kaiser Family data by removing null values, converted needed values to percentages, built new dataframes with an added column for years, and concatenated seperate dataframes into one.  

- We then reviewed the data of the America's Health Rankings for relevant measures and eliminated others, seperating demographic breakdowns where available into indiviudal CSVs, modified column names to better load into PostGres.  Lastly, we cleaned the UNICEF data by adding columns in for latitude and longitude of the countries, based on location column, split item into two parts and then removed unneeded columns.

**Analysis**


**Load**

Within Jupyter Notebook, we exported cleaned CSVs into PostGres as tables in a unified database.  We then set an object and declared base in SQLAlchemy.  Next  table scheme were created corresponding to the individual CSV files.  We also created an engine and connection to the Postgres database and created the tables. A similar process was followed to create a local database: connection was made to SQLite file, tables were specified to be loaded, created, and binded to the local database.

## Data Exploration ##

- The US has a unique place within peer countries for outcomes of women's overall and maternal health due to a variety of factors and there are specific challenges related to the US's healthcare system that could lead to difficulties caring for its population, particularly women.

- It was hypothesized that insurance coverage could affect health, and specifically women's health.  The period of 2009-19 was selected due to two specific changes in policy during this time period: in 2010 coverage was allowed for dependents up to age 26 and in 2014 the Affordable Care Act was implented with expansion of Medicaid coverage made available to the states.

- Other health factors were also considered and investigated in order to evaluate insurance coverage's relative importance within the US health system.  It is important to remember there are some differences in reporting over time including between 2003 and 2017, where states were incrementally implementing pregnancy checkbox on death certificates with universal implementation by 2017.


## Flask Web Application: ##

**Heroku Landing Page**

Created the intial landing page to showcase global mortality ratio per 100,000 births.  The map shows their ranking and 

![Global Mortality Ration Map!](/ETL/Screenshots/Global Map.jpg "Global Mortality Ratio")



Web application is deployed on Heroku: [Maternal Mortality Heroku App](https://maternal-mortality-project.herokuapp.com/)

Source code is available on GitHub: [GitHub Source Code](https://github.com/abpuccini/project2-maternal-mortality)


 ## Libraries & Tools Used: ##
 Python Version 3.6
 Juypter Notebook
 Pandas
 PostgresSQL
 Flask
 Plotly

