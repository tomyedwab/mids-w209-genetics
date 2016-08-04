import csv
import json
import re

data = {}
classes = set()

with open("diseaseome.tsv", "rb") as tsvin:
    reader = csv.reader(tsvin, delimiter='\t')

    first_row = True
    last_disease = ""
    for row in reader:
        if first_row:
            first_row = False
            continue

        name = row[1].split(",")[0]
        name = re.sub(r' \(3\)$', '', name)
        name = re.sub(r' \(3\) \(\)$', '', name)
        name = re.sub(r'-[0-9]+$', '', name)
        name = re.sub(r'-3A$', '', name)
        name = re.sub(r' [0-9]+$', '', name)
        name = re.sub(r' I+$', '', name)
        name = re.sub(r' IIA$', '', name)
        name = re.sub(r' IIB$', '', name)
        name = re.sub(r' IIIA$', '', name)
        name = re.sub(r' IIIC$', '', name)
        name = re.sub(r' IV$', '', name)
        name = re.sub(r' IVA$', '', name)
        name = re.sub(r' IVB$', '', name)
        name = re.sub(r' VII$', '', name)
        name = re.sub(r' Ih$', '', name)
        name = re.sub(r' Ih/s$', '', name)
        name = re.sub(r' Is$', '', name)
        name = re.sub(r' type IIID$', '', name)
        name = re.sub(r' type IX$', '', name)
        name = re.sub(r' 1A$', '', name)
        name = re.sub(r' 3A$', '', name)
        name = re.sub(r' 1E$', '', name)
        name = re.sub(r' Ib$', '', name)
        name = re.sub(r' Ic$', '', name)
        name = re.sub(r' IIb$', '', name)
        name = re.sub(r' IIIa$', '', name)
        name = re.sub(r' IIIb$', '', name)
        name = re.sub(r' VI$', '', name)

        location = row[4].split("-")[0]
        matches = re.match(r'(\d+|X|Y)(p|q|cen)(\d\d|ter|)(.\d+|)', location)
        if matches is None:
            if location.startswith("Chr."):
                match_locations = [location[4:],"","",""]
            else:
                print "Invalid location %s" % location
                continue
        else:
            match_locations = list(matches.groups())

        id = row[0]
        genes = row[2]
        gclass = row[5]

        classes.add(gclass)

        if id not in data:
            data[id] = {
                "name": name,
                "genes": [],
                "className": gclass,
                "prevalence": None,
                "description": ""
            }

        data[id]["genes"].append({
            "location": match_locations,
            "names": genes.split(", "),
        })

with open("diseaseome_prev.csv", "rU") as csvin:
    reader = csv.reader(csvin)
    first = True
    for row in reader:
        if first:
            first = False
            continue
        id = row[0]
        if id not in data:
            print "diseaseome_prev refers to invalid OMIM ID %s" % id
            continue

        data[id]["prevalence"] = row[6]

with open("diseaseome_desc.csv", "rU") as csvin:
    reader = csv.reader(csvin)
    first = True
    for row in reader:
        if first:
            first = False
            continue
        id = row[1]
        if id not in data:
            print "diseaseome_desc refers to invalid OMIM ID %s" % id
            continue

        data[id]["description"] = row[8].decode('utf-8','ignore').encode("utf-8")

with open("../src/diseaseome.js", "w") as out:
    out.write("export const DISEASEOME = %s;" % json.dumps(data.values()))

print "%d classes: %s" % (len(classes), classes)
