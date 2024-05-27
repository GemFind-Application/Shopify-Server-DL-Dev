<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Validator;

use DB;

use Mail;

use App\Models\User;

use App\Mail\SendEmail;

use Illuminate\Support\Facades\Http;

class DiamondEmailController extends Controller
{
    public static function getDiamondById($id, $type, $shop)
    {
        // header('Access-Control-Allow-Origin: *');

        if ($type && $type == 'labcreated') {
            $diamond_type = '&IslabGrown=true';
        } elseif ($type == 'fancydiamonds') {
            $diamond_type = '&IsFancy=true';
        } elseif ($type == 'mined') {
            $diamond_type = '&IslabGrown=false';
        } else {
            $diamond_type = '';
        }

        $diamondData = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $shop])
            ->get()
            ->first();

        $DealerID = 'DealerID=' . $diamondData->dealerid . '&';

        $DID = 'DID=' . $id;

        $query_string = $DealerID . $DID . $diamond_type;

        $requestUrl = $diamondData->diamonddetailapi . $query_string;

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $response = curl_exec($curl);

        $results = json_decode($response);

        if (curl_errno($curl)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        if (isset($results->message)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        curl_close($curl);

        if ($results->diamondId != '' && $results->diamondId > 0) {
            $diamondData = (array) $results;

            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }

        return $returnData;
    }

    public function getJCOptionsapi($shop)
    {
        return 'http://api.jewelcloud.com/api/RingBuilder/GetDiamondsJCOptions?';
    }

    function getJCOptions($shop)
    {
        $resultUsername = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $shop])
            ->get()
            ->first();

        $DealerID = 'DealerID=' . $resultUsername->dealerid;

        $jc_options_api = $this->getJCOptionsapi($shop);

        $requestUrl = $jc_options_api . $DealerID;

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $responce = curl_exec($curl);

        $results = (array) json_decode($responce);

        if (isset($results[0])) {
            $results = (array) $results[0];

            if (curl_errno($curl)) {
                return $returnData = ['jc_options' => []];
            }

            if (sizeof($results) == 0) {
                return $returnData = ['jc_options' => []];
            }

            if (sizeof($results) > 0) {
                $returnData = ['jc_options' => $results[0]];

                return $returnData;
            }
        } else {
            return $returnData = ['jc_options' => []];
        }
    }

    public function getDiamondDetailsApi($diamondId, $diamondType, $shop, $showRetailerInfo)
    {

        $diamondData = $this->getDiamondById($diamondId, $diamondType, $shop);

        if (empty($diamondData['diamondData'])) {
            $emptyResponse = [
                '$id' => '1',
                'diamondId' => null,
                'mainHeader' => null,
                'subHeader' => null,
                'stockNumber' => null,
                'price' => null,
                'caratWeight' => null,
                'cut' => null,
                'color' => null,
                'colorID' => null,
                'clarity' => null,
                'clarityID' => null,
                'cutGrade' => null,
                'cutGradeID' => null,
                'depth' => null,
                'table' => null,
                'polish' => null,
                'symmetry' => null,
                'gridle' => null,
                'culet' => null,
                'fluorescence' => null,
                'measurement' => null,
                'originFancy' => null,
                'contactNo' => null,
                'contactEmail' => null,
                'image1' => null,
                'image2' => null,
                'colorDiamond' => null,
                'videoFileName' => null,
                'certificate' => null,
                'price1' => null,
                'price2' => null,
                'lotNumber' => null,
                'additionalImage' => null,
                'fltPrice' => null,
                'txtInhouse' => false,
                'shape' => null,
                'providerImageUrl' => null,
                'certificateNo' => null,
                'certificateUrl' => null,
                'certificateIconUrl' => null,
                'dealerId' => null,
                'stoneCarat' => null,
                'origin' => null,
                'skun' => null,
                'isFavorite' => false,
                'vendorsku' => false,
                'ratio' => null,
                'costPerCarat' => null,
                'vendorName' => null,
                'vendorID' => null,
                'vendorEmail' => null,
                'vendorContactNo' => null,
                'vendorFax' => null,
                'vendorAddress' => null,
                'vendorStockNo' => null,
                'sOrigin' => null,
                'wholeSalePrice' => null,
                'fancyColorMainBody' => null,
                'fancyColorIntensity' => null,
                'fancyColorOvertone' => null,
                'currencyFrom' => null,
                'currencySymbol' => null,
                'retailerStockNo' => null,
                'retailerInfo' => null,
                'internalUselink' => null,
                'girdleThin' => null,
                'girdleThick' => null,
                'country' => null,
                'diamondDeatilAdditionalInfo' => null,
                'showPrice' => false,
                'isLabCreated' => false,
                'dsEcommerce' => false,
                'defaultDiamondImage' => null
            ];

            return $emptyResponse;
        } else {

            $diamondData = $diamondData['diamondData'];

            if ($showRetailerInfo == 'false') {

                unset($diamondData['contactNo']);
                unset($diamondData['contactEmail']);
                unset($diamondData['costPerCarat']);
                unset($diamondData['vendorName']);
                unset($diamondData['vendorEmail']);
                unset($diamondData['vendorContactNo']);
                unset($diamondData['vendorAddress']);
                unset($diamondData['wholeSalePrice']);

                if (isset($diamondData['retailerInfo'])) {
                    unset($diamondData['retailerInfo']->retailerCompany);
                    unset($diamondData['retailerInfo']->retailerName);
                    unset($diamondData['retailerInfo']->retailerCity);
                    unset($diamondData['retailerInfo']->retailerState);
                    unset($diamondData['retailerInfo']->retailerContactNo);
                    unset($diamondData['retailerInfo']->retailerEmail);
                    unset($diamondData['retailerInfo']->retailerLotNo);
                    unset($diamondData['retailerInfo']->retailerStockNo);
                    unset($diamondData['retailerInfo']->wholesalePrice);
                    unset($diamondData['retailerInfo']->thirdParty);
                    unset($diamondData['retailerInfo']->sellerName);
                    unset($diamondData['retailerInfo']->sellerAddress);
                    unset($diamondData['retailerInfo']->retailerAddress);
                }
            }

            return $diamondData;
        }
    }

    public function getShopJsonData($shop)
    {
        $api_key = env('SHOPIFY_API_KEY');

        // Assuming User model has a 'password' field
        $user = User::where(['name' => $shop])->first();
        $apppassword = $user['password'];

        $url = "https://$api_key:$apppassword@$shop/admin/api/" . env('SHOPIFY_API_VERSION') . '/shop.json';

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);

        if ($server_output === false) {
            $error_message = curl_error($ch);
            return response()->json(['error' => 'cURL request failed: ' . $error_message], 500);
        }

        curl_close($ch);

        $response = json_decode($server_output);

        if (property_exists($response, 'shop') && property_exists($response->shop, 'name')) {
            $shop_name = $response->shop->name;
            return response()->json(['name' => $shop_name]);
        }

        return response()->json(['error' => 'Shop name not found in the response'], 500);
    }


    public function dlDropHintApi(Request $request)
    {
        // header('Access-Control-Allow-Origin: *');

        // echo '<pre>';
        // print_r($request->input('recaptchaToken'));

        // exit;

        $validatedData = Validator::make($request->all(), [
            'name' => 'required',

            'email' => 'required',

            'hint_Recipient_name' => 'required',

            'hint_Recipient_email' => 'required',

            'reason_of_gift' => 'required',

            'hint_message' => 'required',

            'deadline' => 'required',


        ]);

        if ($validatedData->fails()) {
            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status'] = 'fail';

            $validation_error['data'] = [];

            return response()->json($validation_error);
        }

        $hint_post_data = $request->all();

        $hintData = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $request->shopurl])
            ->get()
            ->first();

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $hintData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);



        if ($response->success == 'true' || $hintData->secret_key == null) {

            $storeAdminEmail = $hintData->admin_email_address;

            $shopurl = 'https://' . $hint_post_data['shopurl'];

            $storeName = str_replace(".myshopify.com", "", $hint_post_data['shopurl']);

            $store_logo = $hintData->shop_logo;

            $diamondData = $this->getDiamondById($hint_post_data['diamondid'], $hint_post_data['diamondtype'], $hint_post_data['shopurl']);



            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];

            $retailername = $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $hintData->shop;

            // file_put_contents(public_path() . '/diamond_drop.txt', json_encode($diamondData));
            //MAIL TO USER

            $data = [
                'shopurl' => $shopurl,

                'retailername' => $retailername,

                // 'retailerphone' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : $diamondData['diamondData']['vendorContactNo'],
                'retailerphone' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',


                'name' => $hint_post_data['name'],

                'email' => $hint_post_data['email'],

                'hint_Recipient_name' => $hint_post_data['hint_Recipient_name'],

                'hint_Recipient_email' => $hint_post_data['hint_Recipient_email'],

                'reason_of_gift' => $hint_post_data['reason_of_gift'],

                'hint_message' => $hint_post_data['hint_message'],

                'deadline' => $hint_post_data['deadline'],

                'diamondurl' => $hint_post_data['diamondurl'],

                'shop_logo' => $store_logo ? $store_logo : env('APP_URL') . '/images/gemfind-logo.jpg',

                'shop_logo_alt' => $hintData->shop,

                // 'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : '',
                'retailerEmail' => $retaileremail,

                'storeName' => $storeName,

                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : '',

                // 'retailerEmail' => 'support@gemfind.com',
                // 'retailerphone' => '800-373-4373',
            ];


            $shopData = $this->getShopJsonData($hint_post_data['shopurl']);


            //Sender Email

            $user['to'] = $request->email;
            $user['from'] = $hintData->from_email_address ? $hintData->from_email_address : $hintData->admin_email_address;;
            $user['store'] = $shopData->original['name'];


            Mail::send('diamondDropHintSender', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Someone Wants To Drop You A Hint');
                $messages->replyTo($user['from'], $user['store']);
            });

            //Retailer Email

            // echo $data['retailerEmail'];
            $email_array = explode(',', $data['retailerEmail']);

            $user['to'] = $email_array[0];
            // $user['to'] = "bhumil.luckimedia@gmail.com";

            Mail::send('diamondDropHintRetailer', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Someone Wants To Drop You A Hint');
                $messages->replyTo($user['from'], $user['store']);
            });

            //Receiver Email

            $user['to'] = $request->hint_Recipient_email;
            // $user['to'] = "bhumil.luckimedia@gmail.com";

            Mail::send('diamondDropHintReceiver', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Someone Wants To Drop You A Hint');
                $messages->replyTo($user['from'], $user['store']);
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }

    public function dlReqInfoApi(Request $request)
    {
        // header('Access-Control-Allow-Origin: *');

        $validatedData = Validator::make($request->all(), [
            'name' => 'required',

            'email' => 'required',

            'phone_no' => 'required',

            'message' => 'required',

            'contact_preference' => 'required',
        ]);

        if ($validatedData->fails()) {
            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status'] = 'fail';

            $validation_error['data'] = [];

            return response()->json($validation_error);
        }

        $req_post_data = $request->all();

        $currency = $req_post_data['currency'];

        $reqData = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $request->shopurl])
            ->get()
            ->first();


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $reqData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $reqData->secret_key == null) {
            $store_logo = $reqData->shop_logo;

            $storeAdminEmail = $reqData->admin_email_address;

            $shopurl = 'https://' . $req_post_data['shopurl'];

            $storeName = str_replace(".myshopify.com", "", $req_post_data['shopurl']);

            $diamondData = $this->getDiamondById($req_post_data['diamondid'], $req_post_data['diamondtype'], $req_post_data['shopurl']);

            $jc_options = $this->getJCOptions($req_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];
            // file_put_contents(public_path() . '/diamond_drop.txt', json_encode($diamondData));

            $retailername = $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop'];

            if ($diamondData['diamondData']['fancyColorMainBody']) {
                $color_to_display = $diamondData['diamondData']['fancyColorIntensity'] . ' ' . $diamondData['diamondData']['fancyColorMainBody'];
            } elseif ($diamondData['diamondData']['color'] != '') {
                $color_to_display = $diamondData['diamondData']['color'];
            } else {
                $color_to_display = 'NA';
            }

            if ($diamondData['diamondData']['showPrice'] == true) {
                $price = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : '';
            } else {
                $price = 'Call For Price';
            }

            //MAIL TO USER

            $data = [
                'name' => $req_post_data['name'],

                'email' => $req_post_data['email'],

                'phone_no' => $req_post_data['phone_no'],

                'req_message' => $req_post_data['message'],

                'contact_preference' => $req_post_data['contact_preference'],

                'diamond_url' => $req_post_data['diamondurl'] ? $req_post_data['diamondurl'] : '',

                'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : '',

                'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : '',

                'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : '',

                'color' => $color_to_display,

                'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : '',

                'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : '',

                'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : '',

                'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : '',

                'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : '',

                'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : '',

                'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : '',

                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : '',

                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : '',

                // 'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : '',
                /*EMAIL CHANGE GIVEN BY PRASHANT https://gemfinddigitalsolutions.teamwork.com/app/tasks/32697640*/
                // 'vendorEmail' => 'support@gemfind.com',

                // 'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',



                //'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : '',
                'vendorEmail' => 'support@gemfind.com',

                // 'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',
                'vendorContactNo' => '800-373-4373',

                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : '',

                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : '',

                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : '',

                'retailerEmail' => $retaileremail,

                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : '',

                'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : '',

                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : '',

                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : '',

                'shop_logo' => $store_logo ? $store_logo : env('APP_URL') . '/images/gemfind-logo.jpg',

                'shop_logo_alt' => $reqData->shop,

                'shopurl' => $shopurl,

                'storeName' => $storeName,

                'message' => 'Hello, this is a simple text message.',

                // 'retailerphone' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : $diamondData['diamondData']['vendorContactNo'],

                'retailerphone' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',

            ];




            if ($diamondData['diamondData']['currencyFrom'] == 'USD') {
                $currency_symbol = "$";
            } else {
                $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
            }

            if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {
                $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
            } else {
                $certificate_html = '';
            }

            $shopData = $this->getShopJsonData($req_post_data['shopurl']);
            // $jsonContent = $shopData->json();

            // Access the 'name' property from the content
            // $shopName = $jsonContent['name'];


            //Sender Email

            $from_email_address = $reqData->from_email_address ? $reqData->from_email_address : $reqData->admin_email_address;


            // echo '<pre>';
            // print_r($reqData);
            // // print_r($from_email_address);
            // exit;


            // Dynamically set the "from" address based on the store
            $user['to'] = $req_post_data['email'];
            $user['from'] = $from_email_address;
            $user['store'] = $shopData->original['name'];

            Mail::send('diamondReqInfoSender', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Request For More Info');
                $messages->replyTo($user['from'], $user['store']); // Set the "reply-to" address
            });

            //Retailer Email

            $user['to'] = $retaileremail;
            // $user['to'] = 'bhumil.luckimedia@gmail.com';

            Mail::send('diamondReqInfoRetailer', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Request For More Info');
                $messages->replyTo($user['from'], $user['store']);
            });

            // Create an instance of SendEmail Mailable
            // $email = new SendEmail($data, 'Custom Subject'); // You can specify a custom subject here

            // echo '<pre>';
            // print_r($email);
            // exit;

            // Send email to user
            // Mail::to($req_post_data['email'])
            //     ->send($email);

            // Send email to retailer
            // Mail::to($retaileremail)
            //     ->send($email);



            // Sender details
            // $senderEmail = "shopifyapps@shopifyappserver.gemfind.com";
            // $senderName = "Your Sender Name"; // Replace with your actual sender name
            // $data['accountName'] = "Your Account Name";

            // // Create an instance of SendEmail Mailable
            // $email = new SendEmail($data, $senderEmail, $senderName);

            // // Send email to user
            // Mail::to($req_post_data['email'])
            //     ->send($email);

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }

    public function dlEmailFriendApi(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required',

            'email' => 'required',

            'frnd_name' => 'required',

            'frnd_email' => 'required',

            'frnd_message' => 'required',
        ]);

        if ($validatedData->fails()) {
            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status'] = 'fail';

            $validation_error['data'] = [];

            return response()->json($validation_error);
        }

        $email_friend_post_data = $request->all();

        $currency = $email_friend_post_data['currency'];

        $frndData = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $request->shopurl])
            ->get()
            ->first();


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $frndData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $frndData->secret_key == null) {

            $storeAdminEmail = $frndData->admin_email_address;

            $store_logo = $frndData->shop_logo;

            $shopurl = 'https://' . $email_friend_post_data['shopurl'];

            $storeName = str_replace(".myshopify.com", "", $email_friend_post_data['shopurl']);

            $diamondData = $this->getDiamondById($email_friend_post_data['diamondid'], $email_friend_post_data['diamondtype'], $email_friend_post_data['shopurl']);

            $jc_options = $this->getJCOptions($email_friend_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];

            $retailername = $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop'];

            if ($diamondData['diamondData']['fancyColorMainBody']) {
                $color_to_display = $diamondData['diamondData']['fancyColorIntensity'] . ' ' . $diamondData['diamondData']['fancyColorMainBody'];
            } elseif ($diamondData['diamondData']['color'] != '') {
                $color_to_display = $diamondData['diamondData']['color'];
            } else {
                $color_to_display = 'NA';
            }

            if ($diamondData['diamondData']['showPrice'] == true) {
                $price = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : '';
            } else {
                $price = 'Call For Price';
            }

            //MAIL TO USER

            $data = [
                'name' => $email_friend_post_data['name'],

                'email' => $email_friend_post_data['email'],

                'frnd_name' => $email_friend_post_data['frnd_name'],

                'frnd_email' => $email_friend_post_data['frnd_email'],

                'frnd_message' => $email_friend_post_data['frnd_message'],

                'diamond_url' => $email_friend_post_data['diamondurl'] ? $email_friend_post_data['diamondurl'] : '',

                'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : '',

                'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : '',

                'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : '',

                'color' => $color_to_display,

                'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : '',

                'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : '',

                'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : '',

                'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : '',

                'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : '',

                'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : '',

                'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : '',

                // 'price' => $diamondData['diamondData']['fltPrice'] ? number_format($diamondData['diamondData']['fltPrice']) : '',
                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : '',

                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : '',

                //'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : '',
                'vendorEmail' => 'support@gemfind.com',

                // 'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',
                'vendorContactNo' => '800-373-4373',

                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : '',

                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : '',

                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : '',

                // 'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : '',
                'retailerEmail' => $retaileremail,

                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : '',

                'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : '',

                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : '',

                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : '',

                'shop_logo' => $store_logo ? $store_logo : env('APP_URL') . '/images/gemfind-logo.jpg',

                'shop_logo_alt' => $frndData->shop,

                'shopurl' => $shopurl,

                'storeName' => $storeName,

                // 'retailerphone' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : $diamondData['diamondData']['vendorContactNo'],

                'retailerphone' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',
            ];

            if ($diamondData['diamondData']['currencyFrom'] == 'USD') {
                $currency_symbol = "$";
            } else {
                $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
            }

            if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {
                $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
            } else {
                $certificate_html = '';
            }

            $shopData = $this->getShopJsonData($email_friend_post_data['shopurl']);

            //Sender Email

            $user['to'] = $email_friend_post_data['email'];
            $user['from'] = $frndData->from_email_address ? $frndData->from_email_address : $frndData->admin_email_address;
            $user['store'] = $shopData->original['name'];

            Mail::send('diamondEmailFriendSender', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('A Friend Wants To Share With You');
                $messages->replyTo($user['from'], $user['store']);
            });

            //Retailer Email

            $user['to'] = $retaileremail;
            // $user['to'] = 'bhumil.luckimedia@gmail.com';

            Mail::send('diamondEmailFriendRetailer', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('A Friend Wants To Share With You');
                $messages->replyTo($user['from'], $user['store']);
            });

            // Receiver email

            $user['to'] = $email_friend_post_data['frnd_email'];
            // $user['to'] = 'bhumil.luckimedia@gmail.com';

            Mail::send('diamondEmailFriendReceiver', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('A Friend Wants To Share With You');
                $messages->replyTo($user['from'], $user['store']);
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }

    public function dlScheViewApi(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required',

            'email' => 'required',

            'phone_no' => 'required',

            'schl_message' => 'required',

            'location' => 'required',

            'availability_date' => 'required',

            'appnt_time' => 'required',
        ]);

        if ($validatedData->fails()) {
            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status'] = 'fail';

            $validation_error['data'] = [];

            return response()->json($validation_error);
        }

        $sch_view_post_data = $request->all();


        $currency = $sch_view_post_data['currency'];

        $schldData = DB::table('diamondlink_config')
            ->select('*')
            ->where(['shop' => $request->shopurl])
            ->get()
            ->first();


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $schldData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $schldData->secret_key == null) {

            $storeAdminEmail = $schldData->admin_email_address;

            $store_logo = $schldData->shop_logo;

            $shopurl = 'https://' . $sch_view_post_data['shopurl'];

            $storeName = str_replace(".myshopify.com", "", $sch_view_post_data['shopurl']);

            $diamondData = $this->getDiamondById($sch_view_post_data['diamondid'], $sch_view_post_data['diamondtype'], $sch_view_post_data['shopurl']);

            $jc_options = $this->getJCOptions($sch_view_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];


            $retailername = $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $schldData['shop'];

            if ($diamondData['diamondData']['fancyColorMainBody']) {
                $color_to_display = $diamondData['diamondData']['fancyColorIntensity'] . ' ' . $diamondData['diamondData']['fancyColorMainBody'];
            } elseif ($diamondData['diamondData']['color'] != '') {
                $color_to_display = $diamondData['diamondData']['color'];
            } else {
                $color_to_display = 'NA';
            }

            if ($diamondData['diamondData']['showPrice'] == true) {
                $price = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : '';
            } else {
                $price = 'Call For Price';
            }

            //MAIL TO USER

            $data = [
                'name' => $sch_view_post_data['name'],

                'email' => $sch_view_post_data['email'],

                'phone_no' => $sch_view_post_data['phone_no'],

                'schl_message' => $sch_view_post_data['schl_message'],

                'location' => $sch_view_post_data['location'],

                'availability_date' => $sch_view_post_data['availability_date'],

                'appnt_time' => $sch_view_post_data['appnt_time'],

                'diamond_url' => $sch_view_post_data['diamondurl'] ? $sch_view_post_data['diamondurl'] : '',

                'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : '',

                'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : '',

                'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : '',

                'color' => $color_to_display,

                'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : '',

                'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : '',

                'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : '',

                'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : '',

                'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : '',

                'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : '',

                'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : '',

                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : '',

                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : '',

                // 'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : '',

                // 'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',


                //'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : '',
                'vendorEmail' => 'support@gemfind.com',

                // 'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',
                'vendorContactNo' => '800-373-4373',

                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : '',

                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : '',

                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : '',

                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : '',

                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : '',

                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : '',

                // 'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : '',
                'retailerEmail' => $retaileremail,

                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : '',

                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : '',

                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : '',

                'shop_logo' => $store_logo ? $store_logo : env('APP_URL') . '/images/gemfind-logo.jpg',

                'shop_logo_alt' => $schldData->shop,

                'shopurl' => $shopurl,

                'storeName' => $storeName,

                // 'retailerphone' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : $diamondData['diamondData']['vendorContactNo'],

                'retailerphone' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : '',
            ];

            if ($diamondData['diamondData']['currencyFrom'] == 'USD') {
                $currency_symbol = "$";
            } else {
                $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
            }

            if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {
                $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
            } else {
                $certificate_html = '';
            }

            $shopData = $this->getShopJsonData($sch_view_post_data['shopurl']);

            //Sender Email

            $user['to'] = $sch_view_post_data['email'];
            $user['from'] = $schldData->from_email_address ? $schldData->from_email_address : $schldData->admin_email_address;
            $user['store'] = $shopData->original['name'];


            Mail::send('diamondScheViewSender', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Request To Schedule A Viewing');
                $messages->replyTo($user['from'], $user['store']);
            });

            //Retailer Email

            $user['to'] = $retaileremail;
            // $user['to'] = 'bhumil.luckimedia@gmail.com';

            Mail::send('diamondScheViewRetailer', $data, function ($messages) use ($user) {
                $messages->to($user['to']);
                $messages->from($user['from'], $user['store']);
                $messages->subject('Request To Schedule A Viewing');
                $messages->replyTo($user['from'], $user['store']);
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }
}
