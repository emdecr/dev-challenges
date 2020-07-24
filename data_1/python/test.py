# install pandas (I used pip)
# https://pandas.pydata.org/pandas-docs/stable/getting_started/install.html

# importing pandas package 
import pandas as pd 
  
# making data frame from csv file  
df = pd.read_csv("../raw_data.csv") 
  
# test filtering with query method 
#df.query('case_category == "Category A"') 

# find count for each category
categories_count = df.groupby('case_category')['id'].count()

# find earlier case for each category
earliest_cases = df.groupby('case_category')['case_date'].min()

# find latest case for each category
latest_cases = df.groupby('case_category')['case_date'].max()
  
# display summary
print('\nThe number of cases in each category are:\n') 
print(categories_count) 

print('\nThe earliest case in each category:\n') 
print(earliest_cases) 

print('\nThe latest case in each category:\n') 
print(latest_cases) 