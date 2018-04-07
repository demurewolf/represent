# import libraries
import requests
import csv
from bs4 import BeautifulSoup


quote_page = 'https://www.govtrack.us/congress/bills/#docket'
prefix = 'https://www.govtrack.us'
page = requests.get(quote_page)
soup = BeautifulSoup(page.text, 'html.parser')
trending = str("Trending now")
docket = soup.find(id='docket')
headers_list = docket.find_all('h2')
to_remove = docket.find(id='top_tracked_bills')
to_remove.decompose()
print(headers_list)
f = csv.writer(open('bill_board_data.csv', 'w'))
f.writerow(['Bill', 'Link'])
for header in headers_list:
    if header.text == trending:
        bill_list = docket.find_all('a')
        links = {}
        print(header.text)
for bill in bill_list:
    print(bill.text)
    links[bill] = prefix + bill.get('href')
    print(links[bill])
    f.writerow([bill.text, links[bill]])
