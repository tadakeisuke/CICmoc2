# __generated__ by Zscaler Terraformer from テスト
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_11" {
  configured_name                           = "業務用（テスト）"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 2
  description                               = "テスト"
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "TRAVEL"
  type                                      = "URL_CATEGORY"
  urls                                      = ["google.com", "www.mki.co.jp"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_07
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_07" {
  configured_name                           = "aaaaaa"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 2
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "ENTERTAINMENT_AND_RECREATION"
  type                                      = "URL_CATEGORY"
  urls                                      = ["mki.co.jp", "yahoo.co.jp"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_12
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_12" {
  configured_name                           = "ICT2-MFD_TADA_Defined"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 1
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = ["www.youtube.com"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_17
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_17" {
  configured_name                           = "MFD-Hayashi_AppStore-Allow"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = [".apple.com", ".icloud.com", ".apps.apple.com", "swscan.apple.com", "gs-loc.apple.com", "xp.apple.com", "securemetrics.apple.com", ".mzstatic.com", "ppq.apple.com", ".itunes.apple.com", "akadns.net", "gsa.apple.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 12
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_15
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_15" {
  configured_name                           = "MFD-Hayashi_Microsoft_Allow"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["i.manage.microsoft.com", "login.microsoftonline.com", "mamservice.manage.microsoft.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 3
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_13
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_13" {
  configured_name                           = "MFD-Hayashi_SSL_Exclude_for_iOS"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["iphone-ld.apple.com", "gateway.icloud.com", "init.push.apple.com", "gsp10-ssl.apple.com", "cl4.apple.com", "app-site-association.cdn-apple.com", "amp-api.media.apple.com", "gsas.apple.com", "mamservice.manage.microsoft.com", "configuration.apple.com", "doh.dns.apple.com", "init.ess.apple.com", "cl3.apple.com", "smp-device-content.apple.com", "lcdn-locator.apple.com", "kt-prod.ess.apple.com", "clients3.google.com", "humb.apple.com", "cstat.cdn-apple.com", "ontology.health.apple.com", "res.cdn.office.net", "experiments.apple.com", "cl2.apple.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 23
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_20
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_20" {
  configured_name                           = "TemoTemo"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 1
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = ["google.com"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_18
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_18" {
  configured_name                           = "MFD-Hayashi_Exempted URL"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["login.windows.net", "i.manage.microsoft.com", "login.microsoft.com", "login.microsoftonline.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 4
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_16
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_16" {
  configured_name                           = "MFD-Hayashi_icloud-Allow"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = [".icloud.com", ".icloud-content.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 2
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_10
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_10" {
  configured_name                           = "MFRS_User_Allow_URL"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 2
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = ["test.com", "www.mki.co.jp"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_09
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_09" {
  configured_name                           = "0913"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 2
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = [".windowsazure.com", "yahoo.co.jp"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_04
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_04" {
  configured_name                           = "kogawa-test-block"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["www.ugtop.com", "www.cman.jp"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 2
}

# __generated__ by Zscaler Terraformer from 片倉テスト用
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_02" {
  configured_name                           = "White-List Test_katakura"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 1
  description                               = "片倉テスト用"
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = ["mki.co.jp"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_08
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_08" {
  configured_name                           = "test"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 2
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = ["mki.co.jp", "yahoo.com"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_01
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_01" {
  configured_name                           = "Apple iTunes and App Store"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = [".icloud.com", ".apps.apple.com", "swscan.apple.com", "gs-loc.apple.com", "xp.apple.com", "securemetrics.apple.com", ".mzstatic.com", "ppq.apple.com", ".itunes.apple.com", "akadns.net", "gsa.apple.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 11
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_05
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_05" {
  configured_name                           = "AD2-F-jalan.net"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  custom_urls_count                         = 1
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls                                      = [".jalan.net/"]
  urls_retaining_parent_category_count      = 0
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_03
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_03" {
  configured_name                           = "yahoo.co.jp"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = [".yahoo.co.jp"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 1
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_06
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_06" {
  configured_name                           = "kyusyu-jra-allow"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = [".jra.go.jp"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 1
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_19
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_19" {
  configured_name                           = "MFD-Hayashi_Kankyo-sapporo"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["www.kankyou-sapporo.com", ".kankyou-sapporo.com"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 2
}

# __generated__ by Zscaler Terraformer from ID CUSTOM_14
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_14" {
  configured_name                           = "MFD-Hayashi_GSpreadseet"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["docs.google.com/forms/d/e/1FAIpQLSfuDMNoGTQy7E0m7sfn-27TpTOP8_enc03MiziDIMNCs2kGNA/viewform"]
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 1
}

# __generated__ by Zscaler Terraformer from SSL復号除外対象URL
resource "zia_url_categories" "resource_zia_url_categories_CUSTOM_21" {
  configured_name                           = "MFD-Hayashi_Not-SSL"
  custom_category                           = true
  custom_ip_ranges_count                    = 0
  db_categorized_urls                       = ["www.kankyou-sapporo.com"]
  description                               = "SSL復号除外対象URL"
  editable                                  = true
  ip_ranges_retaining_parent_category_count = 0
  super_category                            = "USER_DEFINED"
  type                                      = "URL_CATEGORY"
  urls_retaining_parent_category_count      = 1
}

