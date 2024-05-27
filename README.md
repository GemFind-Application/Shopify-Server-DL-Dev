# Shopify-Server-DL-Dev
Shopify DiamondLink 2.0 Public Application



### After Cloning the Repository

Follow these steps to set up the project:

### Backend Setup

Step 1: Open the folder in VS Code.

Step 2: In the root directory, install the node modules by running the following command:

	npm i or npm i --force

Step 3: Once installed, you will see the `node_modules` folder in the root directory.

Step 4: Download the `.env` file from the DL 2.0 server and add it to your local system.

Step 5: Add `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` to the `shopify-app.php` file located at `../Shopify-Server-DL-Dev/config/shopify-app.php`.

	Example:

	/*
	|--------------------------------------------------------------------------
	| Shopify API Key
	|--------------------------------------------------------------------------
	| This option is for the app's API key.
	|
	*/

	'api_key' => env('SHOPIFY_API_KEY', 'XXXXXXXXXX'), // Replace with your actual key

	/*
	|--------------------------------------------------------------------------
	| Shopify API Secret
	|--------------------------------------------------------------------------
	|
	| This option is for the app's API secret.
	|
	*/

	'api_secret' => env('SHOPIFY_API_SECRET', 'XXXXXXXXXX'), // Replace with your actual key

Step 6: If you are working locally, you might need the `vendor` folder for Laravel. Currently, it is managed server-side, but if needed, you can download it from the server's root folder.



### Uploading Backend Build

Step 1: If changes are made inside the `resource` folder, you need to upload the build file.

Step 2: Open your code in VS Code.

Step 3: In the root folder, run the command:

	npm run build

Step 4: The build file will be generated inside the `public` folder at `../public/build`.

Step 5: Upload the build folder to the server. Navigate to the root folder on FTP > `public` > upload the build folder from your local system. Please back up the previous build file.



### Frontend Setup And How To Upload Build

Step 1: Go to the DL 2.0 Frontend folder.

Step 2: In the DL 2.0 Frontend folder, install node modules by running:

	npm i or npm i --force

Step 3: Navigate to the DL 2.0 Frontend folder using the terminal:

	cd DL\ 2.0\ Frontend

Step 4: Add the `.env` file to the DL 2.0 Frontend folder with the following line:

	REACT_APP_URL=https://dl2.gemfind.us/api

Step 5: Run the command to start the frontend:

	npm start

	This will show the frontend view on your local system.

Step 6: After making changes, run the command to build the frontend:

	npm run build

Step 7: This will create JS and CSS files inside the `build` folder.

Step 8: Upload these JS and CSS files to the server.

	Paths for JS:

	/public_html/public/static/js

	Paths for CSS:

	/public_html/public/static/css

Step 9: Rename the JS and CSS files to `main.js` and `main.css` respectively.


### Gemfind-DL-2.0-Vite (If You Install Latest Composer , Then you need to Apply Following changes on your vendor package)

After taking git clone :

    1.composer install

    2.npm install

    3.For backend app build run "npm run build" command -> build will be generated in public/build folder -> upload whole build folder in live

Note : Always use npm run dev for generate build of react backend
if npm run watch will be used then env variables cannot be accessed
FOR RECURING APP CHARGES ACCORDING TO COUPON CODE

Please note that, whenever the kyon147 package will be upgraded, note this changes we have done in specific files..
Add below code in index() function of src\Traits\BillingController.php
$price = $request->get('price') ? urldecode($request->get('price')) : "null"; $url = $getPlanUrl( $shop->getId(), NullablePlanId::fromNative($plan), $host, $price );

Do needful changes according to below code in **invoke() function of src\Actions\GetPlanUrl.php
public function **invoke(ShopId $shopId, NullablePlanId $planId, string $host, string $price): string { // Get the shop $shop = $this->shopQuery->getById($shopId);

    // Get the plan
    $plan = $planId->isNull() ? $this->planQuery->getDefault() : $this->planQuery->getById($planId);

    // Confirmation URL
    if ($plan->getInterval()->toNative() === ChargeInterval::ANNUAL()->toNative()) {
        $api = $shop->apiHelper()
            ->createChargeGraphQL($this->chargeHelper->details($plan, $shop, $host, $price));

        $confirmationUrl = $api['confirmationUrl'];
    } else {
        $api = $shop->apiHelper()
            ->createCharge(
                ChargeType::fromNative($plan->getType()->toNative()),
                $this->chargeHelper->details($plan, $shop, $host, $price)
            );

        $confirmationUrl = $api['confirmation_url'];
    }

    return $confirmationUrl;

}

Do needful changes according to below code in details() function of src\Services\ChargeHelper.php
add 4th param in function as float $price like --- public function details(Plan $plan, IShopModel $shop, string $host, string $price="null"){ // Change $transfer-> price line to this // $transfer->price = $price != "null" ? (float)$price : $plan->price; }
