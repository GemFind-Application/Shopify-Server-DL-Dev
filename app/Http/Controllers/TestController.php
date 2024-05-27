<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use DB;

class TestController extends Controller
{
    public function getWebhook()
    {
        $api_key = env('VITE_SHOPIFY_API_KEY');
        $users = User::get()->toArray();
        foreach ($users as $key => $value) {
            $hostname = $value['name'];
            $apppassword = $value['password'];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            $url = 'https://' . $api_key . ':' . $apppassword . '@' . $hostname . '/admin/api/2023-01/shop.json';
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            $server_output = curl_exec($ch);
            $shopData = json_decode($server_output, true);
            if (isset($shopData['shop'])) {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
                $url = 'https://' . $api_key . ':' . $apppassword . '@' . $hostname . '/admin/api/2023-01/webhooks.json';
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_HEADER, false);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
                $server_output = curl_exec($ch);
                $webhookData = json_decode($server_output, true);
                $finalData = [
                    'hostname'  => "'" . $hostname . "'",
                    'password'  => "'" . $apppassword . "'",
                    'webhook'   => $webhookData
                ];
                echo '<pre>';
                print_r($finalData);
            }
        }
        exit;

        return $finalData;
    }

    public function setShopUpdateWebhook(Request $request)
    {
        $api_key = env('VITE_SHOPIFY_API_KEY');
        $data['webhook'] = array(
            "topic"     => "shop/update",
            'address'   => "https://gfdiamondlink.com/api/appShopUpdateJob"
        );
        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        $url = 'https://' . $api_key . ':' . $request->password . '@' . $request->hostname . '/admin/api/2023-01/webhooks.json';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $output = curl_exec($ch);
        $final_data = json_decode($output, true);
        echo '<pre>';
        print_r($final_data);
    }

    public function setUninstallWebhook(Request $request)
    {
        $api_key = env('VITE_SHOPIFY_API_KEY');
        $data['webhook'] = array(
            "topic"     => "app/uninstalled",
            'address'   => "https://gfdiamondlink.com/api/appUninstallJob"
        );
        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        $url = 'https://' . $api_key . ':' . $request->password . '@' . $request->hostname . '/admin/api/2023-01/webhooks.json';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $output = curl_exec($ch);
        $final_data = json_decode($output, true);
        echo '<pre>';
        print_r($final_data);
    }

    // public function updateUninstallWebhook(Request $request){
    //     $api_key = env('VITE_SHOPIFY_API_KEY');
    //     $data['webhook'] = array(
    //         // "topic"     => "app/uninstalled",
    //         // 'address'   => "https://gfdiamondlink.com/api/appUninstallJob"
    //         'address'   => "https://gfdiamondlink.com/api/appShopUpdateJob"
    //     );
    //     $data_string = json_encode($data);
    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    //     $url = 'https://' . $api_key . ':' . $request->password . '@' . $request->hostname . '/admin/api/2023-01/webhooks/'.$request->id.'.json';
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_HEADER, false);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    //     $output = curl_exec($ch);
    //     $final_data = json_decode($output, true);
    //     echo '<pre>';print_r($final_data);
    // }


    public function updateUninstallWebhook()
    {
        // echo '<pre>';
        // print_r($_REQUEST);
        // exit;

        $api_key = env('VITE_SHOPIFY_API_KEY');
        $data['webhook'] = array(
            "topic"     => "app/uninstalled",
            'address'   => "https://dl2.gemfind.us/api/appUninstallJob"
            //'address'   => "https://gfdiamondlink.com/api/appShopUpdateJob"
        );

        $password = $_REQUEST['password'];
        $hostname = $_REQUEST['hostname'];
        $id = $_REQUEST['id'];

        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        $url = 'https://' . $api_key . ':' . $password . '@' . $hostname . '/admin/api/2023-01/webhooks/' . $id . '.json';
        // echo $url;
        // exit;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $output = curl_exec($ch);
        $final_data = json_decode($output, true);
        echo '<pre>';
        print_r($final_data);
    }

    public function updateShopUpdateWebhook()
    {
        // echo '<pre>';
        // print_r($_REQUEST);
        // exit;

        $api_key = env('VITE_SHOPIFY_API_KEY');
        $data['webhook'] = array(
            "topic"     => "shop/update",
            'address'   => "https://dl2.gemfind.us/api/appShopUpdateJob"
        );

        $password = $_REQUEST['password'];
        $hostname = $_REQUEST['hostname'];
        $id = $_REQUEST['id'];

        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        $url = 'https://' . $api_key . ':' . $password . '@' . $hostname . '/admin/api/2023-01/webhooks/' . $id . '.json';
        // echo $url;
        // exit;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $output = curl_exec($ch);
        $final_data = json_decode($output, true);
        echo '<pre>';
        print_r($final_data);
    }

    public function deleteAppWebhook()
    {
        // // echo '<pre>';
        // // print_r($_REQUEST);
        // // exit;

        // $api_key = env('VITE_SHOPIFY_API_KEY');
        // // $data['webhook'] = array(
        // //     "topic"     => "shop/update",
        // //     'address'   => "https://gfdiamondlink.com/api/appShopUpdateJob"
        // // );

        $id = $_REQUEST['id'];
        $hostname = $_REQUEST['hostname'];
        $apppassword = $_REQUEST['password'];

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        // $url = 'https://' . $api_key . ':' . $apppassword . '@' . $hostname . '/admin/api/2023-01/webhooks/' . $id . '.json';
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_HEADER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        // $server_output = curl_exec($ch);
        // $final_data = $shopData = json_decode($server_output, true);

        echo 'curl -X DELETE "https://' . $hostname . '/admin/api/2024-01/webhooks/' . $id . '.json" \ -H "X-Shopify-Access-Token:' . $apppassword . '"';
        // print_r($final_data);
    }
}
