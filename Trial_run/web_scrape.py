# import libraries
import requests
from bs4 import BeautifulSoup
quote_page = 'https://www.govtrack.us/congress/bills/#docket'
prefix = 'https://www.govtrack.us'
page = requests.get(quote_page)
c = page.content
soup = BeautifulSoup(page.text, 'html.parser')
trending = str("Trending now")
docket = soup.find(id='docket')
headers_list = docket.find_all('h2')
to_remove = docket.find(id='top_tracked_bills')
to_remove.decompose()
print(headers_list)
for header in headers_list:
    if header.text == trending:
        bill_list = docket.find_all('a')
        links = {}
        print(header.text)
for bill in bill_list:
    print(bill.text)
    links[bill] = prefix + bill.get('href')
    print(links[bill])
