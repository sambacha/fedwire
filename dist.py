import os
import zipfile
import hashlib
import time


def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        if ".git" not in root:
            for file in files:
                ziph.write(os.path.join(root, file))


t0 = time.time()

zipf = zipfile.ZipFile("fedwire.zip", "w", zipfile.ZIP_DEFLATED)
zipdir("fedwire.tab", zipf)
zipf.close()

file_hash = hashlib.md5(open("fedwire.zip", "rb").read()).hexdigest()

t1 = time.time()
total = t1 - t0

print("Done in:", total)
print("Hash:", file_hash)
