import sqlite3

conn = sqlite3.connect(
    "users.db"
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS footprint(
id INTEGER PRIMARY KEY,
carbon REAL
)
""")

conn.commit()
conn.close()

def get_history():

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT date,carbon,eco_score
    FROM footprint
    ORDER BY id DESC
    LIMIT 10
    """)

    data = cursor.fetchall()

    conn.close()

    return data