<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;
use Log;
use PDF;

class AddToCartController extends Controller
{
    public function addToCart(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        // echo '<pre>';
        // print_r($request->all());
        // exit;

        $shop_data = User::where('name', $request->shop_domain)->firstOrFail();
        $shop_base_url = "https://" . $request->shop_domain;
        $diamond_product_id = "";
        $setting_product_id = "";
        if ($request->diamond_id) {
            try {
                $diamondData = $this->getDiamondById($request->dealer_id, $request->diamond_id, $request->is_lab);
                $option_name =  "Title : " . $diamondData['diamondData']['mainHeader'] . " |  StockNumber : " . $diamondData['diamondData']['stockNumber'] . " | Shape : " . $diamondData['diamondData']['shape'] . " | CaratWeight : " . $diamondData['diamondData']['caratWeight'] . " | Cut : " . $diamondData['diamondData']['cut'] . " | Color : " . $diamondData['diamondData']['color'] . " | Clarity : " . $diamondData['diamondData']['clarity'];

                // print_r($diamondData['diamondData']['fltPrice']);
                //    exit;
                $url = 'https://' . $request->shop_domain . '/admin/api/2020-07/graphql.json';
                $qry = '{
                            productVariants(first: 250, query: "' . $request->diamond_id . '") {
                                edges {
                                cursor
                                node {
                                    product{
                                        id
                                    }
                                    inventoryItem {
                                        id
                                    }
                                    id
                                    sku
                                    }
                                }
                            }
                        }';
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, $qry);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    array(
                        'Content-Type: application/graphql',
                        'X-Shopify-Access-Token:' . $shop_data->password
                    )
                );
                $server_output = curl_exec($ch);
                $sku = json_decode($server_output, true);

                if ($sku['data']['productVariants']['edges']) {
                    $in_shopify = "1";
                } else {
                    $in_shopify = "0";
                }
                if ($in_shopify == "1") {
                    $finalSku = $sku['data']['productVariants']['edges'][0]['node'];
                    $variantGid = explode('/', $finalSku['id']);
                    $variantId = $variantGid[4];
                    $productGid = explode('/', $finalSku['product']['id']);
                    $productId = $productGid[4];
                    $InventoryGid = explode('/', $finalSku['inventoryItem']['id']);
                    $InventoryId = $InventoryGid[4];
                    $products_array = array(
                        "product" => array(
                            "id"                => $productId,
                            "variants"          => array(array("id" => $variantId, "price" => number_format($diamondData['diamondData']['fltPrice']), "option1" => $option_name)),
                        )
                    );
                    $update_product = $shop_data->api()->rest('PUT', '/admin/products/' . $productId . '.json', $products_array);
                    $product_data = json_encode($update_product);
                    $finalProductData = json_decode($product_data);
                    $diamond_product_id = $finalProductData->body->product->variants[0]->id;
                    // $locations =  $shop_data->api()->rest('GET', '/admin/locations.json')['body']['container']['locations'];
                    // $location_id = $locations[0]['id'];
                    // $inventory_array = array(array("location_id"=> $location_id, "inventory_item_id"=> $InventoryId, "available" => 10));
                    // $updateInventory = $shop_data->api()->rest('POST','/admin/inventory_levels/set.json',$inventory_array);
                    // Log::info($updateInventory);
                    // echo '<pre>';print_r($diamond_product_id);exit;
                } else {
                    $products_array = array(
                        "product" => array(
                            "title"             => $diamondData['diamondData']['mainHeader'],
                            "body_html"         => $diamondData['diamondData']['subHeader'],
                            "vendor"            => "GemFind",
                            "product_type"      => "GemFindDiamond",
                            "published_scope"   => "web",
                            "tags"              => "SEARCHANISE_IGNORE,GemfindDiamond",
                            "variants"          => array(array("sku" => $request->diamond_id, "price" => number_format($diamondData['diamondData']['fltPrice']), "option1" => $option_name)),
                            "metafields"        => array(array("namespace" => "seo", "key" => "hidden", "value" => 1, "type" => "number_integer")),
                            "sales_channels"    => ["online"] // Adding sales_channels here
                        )
                    );




                    $create_product = $shop_data->api()->rest('POST', '/admin/products.json', $products_array);
                    $product_data = json_encode($create_product);
                    $finalProductData = json_decode($product_data);
                    $product_id = $finalProductData->body->product->id;
                    $diamond_product_id = $finalProductData->body->product->variants[0]->id;

                    $image_url = $diamondData['diamondData']['image2'] ? $diamondData['diamondData']['image2'] : '';

                    $ch = curl_init($image_url);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_USERAGENT, 'Your User-Agent Here');

                    $imageData = curl_exec($ch);

                    $image_array = array("image" => array("attachment" => base64_encode($imageData)));

                    $create_product_image = $shop_data->api()->rest('POST', '/admin/products/' . $product_id . '/images.json', $image_array);
                }
            } catch (Exception $e) {
                redirect($this->agent->referrer() . '/error');
            }
        }


        //REDIRECTING URLS

        if ($diamond_product_id) {
            $checkout_url = $shop_base_url . "/cart/add?id[]=" . $diamond_product_id;
            $response = [
                'status' => true,
                'message' => "diamond",
                'data'    => $checkout_url,
            ];

            // return response()->header('Access-Control-Allow-Origin', '*')->json($response, 200);
            echo json_encode($checkout_url);
            exit;
            redirect($checkout_url);
            // exit;
        }
    }

    public static function getDiamondById($dealerId, $diamondId, $isalab)
    {
        if ($isalab == "true") {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $dealerId . "&DID=" . $diamondId . '&IsLabGrown=true';
        } else {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $dealerId . "&DID=" . $diamondId;
        }
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
        if ($results->diamondId != "" && $results->diamondId > 0) {
            $diamondData = (array) $results;
            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }
        return $returnData;
    }



    //    function printDiamond($shop_domain,$diamond_id,$type) {
    //        //header('Access-Control-Allow-Origin', "*");
    //        header('Access-Control-Allow-Origin: *');
    //        $getDiamondData = self::getDiamondByIdForPdf($shop_domain,$diamond_id,$type);
    //        view()->share('diamond',$getDiamondData);
    //        $pdf = PDF::loadView('printDiamond', $getDiamondData);
    //        $headers = array(
    //          'Content-Type: application/pdf',
    //        );
    //        return $pdf->download('Diamond.pdf',$headers);
    // }

    function printDiamond($shop_domain, $diamond_id, $type)
    {
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        $getDiamondData = self::getDiamondByIdForPdf($shop_domain, $diamond_id, $type);
        // echo "<pre>";
        // print_r($type);
        // exit();
        view()->share('diamond', $getDiamondData);
        $pdf = PDF::loadView('printDiamond', $getDiamondData);
        $headers = array(
            'Content-Type: application/pdf',
        );
        return $pdf->download('Diamond-' . $diamond_id . '.pdf', $headers);
    }


    public static function getDiamondByIdForPdf($shop, $diamondId, $type)
    {
        // $IslabGrown = '';
        // if ($type && $type == 'labcreated') {
        //     $diamond_type = '&IslabGrown=true';
        // } elseif ($type == 'fancydiamonds') {
        //     $diamond_type = '&IsFancy=true';
        // } else {
        //     $diamond_type = '';
        // }



        $shop_data = DB::table('diamondlink_config')->where('shop', $shop)->first();

        if ($type == "true") {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId . '&IsLabGrown=true';
        } else {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId;
        }

        //$requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId;
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
        if ($results->diamondId != "" && $results->diamondId > 0) {
            $diamondData = (array) $results;
            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }
        return $returnData;
    }
}
