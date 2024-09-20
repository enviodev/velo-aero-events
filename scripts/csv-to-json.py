import os
import csv
import json


def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)


def main():
    cache_dir = '.cache'
    for filename in os.listdir(cache_dir):
        if filename.endswith('.csv'):
            csv_file_path = os.path.join(cache_dir, filename)
            json_file_path = os.path.join(
                cache_dir, f"{os.path.splitext(filename)[0]}.json")
            csv_to_json(csv_file_path, json_file_path)
            print(f"Converted {filename} to JSON")


if __name__ == "__main__":
    main()
