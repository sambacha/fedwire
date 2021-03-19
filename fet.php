$frbDomain = "www.frbservices.org";
$frbDir = "https://{$frbDomain}/EPaymentsDirectory";

$client = new \GuzzleHttp\Client;
$jar = new \GuzzleHttp\Cookie\CookieJar;

// Step 1 - Setup Session
$client->request('POST', "{$frbDir}/submitAgreement", [
  'cookies' => $jar,
  'form_params' => [ 'agreementValue' => 'Agree' ],
]);

// Step 2 - Set Cookie
$jar->setCookie(new \GuzzleHttp\Cookie\SetCookie([
  'Name' => 'abaDataCaptureCookie',
  'Value' => 'abaDataCaptureCookie',
  'Domain' => $frbDomain,
]));

// Step 3 - Download FedACHdir.txt
$fedACHDir = $client->request('GET', "{$frbDir}/FedACHdir.txt", [
  'cookies' => $jar
])->getBody()->getContents();
