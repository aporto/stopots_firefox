#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      alex
#
# Created:     29/08/2019
# Copyright:   (c) alex 2019
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import csv
import json
#import unidecode
import unicodedata

with open('dictionary.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    header = csv_reader.next()
    dic = {}
    for name in header:
        uname = unicode(name, "utf-8")
        uname=unicodedata.normalize('NFKD', uname).encode('ascii','ignore')
        dic[uname.upper()] = {}
    for row in csv_reader:
        for idx,name in enumerate(header):
            uname = unicode(name, "utf-8")
            uname=unicodedata.normalize('NFKD', uname).encode('ascii','ignore')
            value = row[idx].strip()
            if value != '':
                uvalue = unicode(value, "utf-8")
                nuvalue=unicodedata.normalize('NFKD', uvalue).encode('ascii','ignore')
                letter = nuvalue[0].upper()# unidecode.unidecode(value)[0]

                uvalues = uvalue.split("/")
                if len(uvalues) == 0:
                    uvalues = uvalue.split("\\")
                if len(uvalues) == 0:
                    uvalues = [uvalue]

                for item in uvalues:
                    try:
                        dic[uname.upper()][letter].append(item)
                    except:
                        dic[uname.upper()][letter] = [item]

with open(r'../plugin/list_of_words.js', 'w') as f:
    f.write("var stopCheats = ")
    json.dump (dic, f, indent=4, sort_keys=True)# , encoding='Win-1252')
    f.write(";\n\n")

    #var stopCheats = [

