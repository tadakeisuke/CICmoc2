
terraform {
  required_providers {
    zia = {
      source = "zscaler/zia"
      version = "3.0.4"
    }
  }
}


#認証情報の設定
provider "zia" {
  username = "tada-keisuke@mkilab.io"
  password = "W@nko11wanwan"
  api_key  = "Bfrap2XSEt9u"
  zia_cloud = "zscalerthree"
}

#URLｶﾃｺﾞﾘの作成
resource "zia_url_categories" "TemoTemo" {
  custom_category = true
  configured_name = "TemoteURL"
  description   = "Wankowanwan"
  super_category  = "USER_DEFINED"
  urls = [
    "",
  ]
}
