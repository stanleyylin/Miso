import pandas as pd

df = pd.read_csv('output.txt')
df.drop_duplicates(subset='message').to_csv('output_deduplicated.csv', index=False)
# python3 /Users/dootss/Documents/GitHub/Miso/dedupe.py