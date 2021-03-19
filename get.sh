#!/bin/bash
# Step 1 - Setup Session
wget frbservices.org/EPaymentsDirectory/submitAgreement \
  --post-data="agreementValue=Agree" \
  --save-cookies cookies.txt --keep-session-cookies --delete-after

# Step 2 - Set Cookie
echo -e "frbservices.org\tFALSE\t/EPaymentsDirectory/\tFALSE\t0\t" \
  "abaDataCaptureCookie\tabaDataCaptureCookie" >>cookies.txt

# Step 3 - Download FedACHdir.txt
wget --load-cookies cookies.txt frbservices.org/EPaymentsDirectory/FedACHdir.txt
