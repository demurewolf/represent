# import libraries
import requests
import csv
from bs4 import BeautifulSoup


quote_page = "MOC.html"
prefix = 'https://www.congress.gov'
soup = BeautifulSoup(open(quote_page, 'r', 1, 'UTF-8'), 'html.parser')
block = soup.find(class_='results')
members = block.find_all(class_='result_item')
f = csv.writer(open('Legislator_data.csv', 'w'))
f.writerow(['last_name', 'first_name', 'Title', 'State',
            'district', 'years_served', 'link'])

for member in members:
    info = member.find('a')
    link = info.get('href')
    name = info.text
    tmp = name.split(', ')
    last_name = tmp[0]
    first_name = tmp[1]
    unnecessary = member.find_all('div')
    additional = unnecessary[1].text
    representative = {}
    senator = {}
    cpy = additional
    if 'Representative' in additional:
        if 'Large' in additional:
            tmp = additional.split(' ')
            d = {}
            d['title'] = str("Representative")
            d['state'] = ' '.join(tmp[tmp.index('for')+1:tmp.index('At')])
            d['cong_dist'] = str("0")
            d['years'] = tmp[len(tmp)-1]
            representative[name] = d
            print("Representative:")
            print(representative[name])
            f.writerow([last_name, first_name, representative[name]['title'], representative[name]['state'],
                        representative[name]['cong_dist'], representative[name]['years'], link])

        else:
            tmp = additional.split(' ')
            d = {}
            state = ' '.join(tmp[tmp.index('for')+1:tmp.index('congressional')-1])
            state = state.replace("'s", "")
            d['title'] = str("Representative")
            d['state'] = state
            d['cong_dist'] = tmp[tmp.index('congressional')-1]
            d['years'] = tmp[len(tmp) - 1]
            representative[name] = d
            print(representative[name])
            f.writerow([last_name, first_name, representative[name]['title'], representative[name]['state'],
                        representative[name]['cong_dist'], representative[name]['years'], link])
    else:
        tmp = additional.split(' ')
        d = {}
        state = ' '.join(tmp[tmp.index('for') + 1:len(tmp)-1])
        state = state.replace(",", "")
        d['title'] = str("Senator")
        d['state'] = state
        d['cong_dist'] = str("0")
        d['years'] = tmp[len(tmp)-1]
        senator[name] = d
        # parse("{} for {}, {:d}-{:d}", additional)
        print("Senator:")
        print(senator[name])
        f.writerow([last_name, first_name, senator[name]['title'], senator[name]['state'],
                    senator[name]['cong_dist'], senator[name]['years'], link])

