type TAccount = "Individual" | "Manager";
/**
 * - GD: Guaranteed Delivery
 * - CPM: Cost per Thousand
 */
type TBidding = "GD" | "CPM"; // | "CPC" | "GD" | "CPV" | "none";
type TGroup = "Standard" | "";
type TAds = "Video" | "Banner";
type TStatus = "Eligible" | "Paused" | "Pending" | "Ended" | "Removed";
type TBudgetDurationType = "Daily" | "Lifetime";
type TCapCycle = "day"; // | "week" | "month";
type TCapLevel = "creative" | "group" | "campaign";
type TCapLevel_Supported = Extract<TCapLevel, "group">;
type TPacingType = "Balanced"; // | "Accelerated";
type TMainAccType = "BUSINESS" | "PERSONAL";
type TThirdParty = "GJW" | "GOOGLE" | "FACEBOOK" | "APPLE";
type TGJWBusinessValidationStatus = "filling" | "pending" | "verified" | "wrong" | "unknown";
type TCpgnSubType = "premium";
type TZoneTimingType = "page_load" | "pre_roll" | "none";
type TZonePlacementLocType = "in_stream" | "out_stream" | "none";
type TZoneDurationRange = "s_0_30" | "s_30_300" | "s_300_inf" | "none";
type TZoneShape = "vertical" | "horizontal" | "square" | "none";
type TCrtvCarrierType = "video" | "banner" | "json_ad";
type TLandingPageTarget = "_blank" | "_self" | "_parent" | "_top";
type TV2VideoBillingMethod = "impression" | "true_view" | "none";
type TV2Status = "active" | "pending" | "paused" | "stopped" | "under_review" | "rejected";
type TDeviceType = "Mobile phones" | "Computers" | "Tablets";
type TDeviceTypeAbbr = "1" | "2" | "3" | "4" | "5" | "6";
type TAdsFormatItem = {
	gui_cpgn_type: TGuiCpgnType;
} & Pick<TFields_v2_adsformat, "adsformat_id" | "adsformat_name"> &
	Pick<TFields_v2_size_template, "sizetp_id" | "sizetp_name" | "width_px" | "height_px"> &
	Pick<TFields_v2_zone_adstype, "ads_type">;
type TAccStatus = "inactive" | "active" | "removed" | "suspended" | "payment_required";
type TAccReviewStatus = "suspended";
type TCpgnStatus = "draft" | "active" | "removed" | "paused" | "pending" | "stopped";
type TGrpStatus = "draft" | "active" | "removed" | "paused";
type TCrtvStatus = "draft" | "active" | "removed" | "paused" | "rejected" | "under_review";
type TAssetStatus = "draft" | "active" | "removed" | "paused" | "rejected" | "under_review";
/**
 * - `under_review`: means to-be-processed by the reviewJobCreation script
 * - `pending_approval`: means reviewJob has been created and is pending review submission
 */
type TAdReviewStatus = "approved" | "rejected" | "under_review" | "pending_approval";
type TPaymentStatus = "payment_required";
type TRjType = "asset" | "ldpg" | "asset_ldpg_relation";
type TRjResourceJson = { asset?: TFields_v2_creative_assets; ldpg?: string };
type TRjResultDetail = { reject_reason?: string; comment?: string };
type TRjResult = "approved" | "rejected";
type TRjEnqueueStatus =
	| "decided"
	| "enqueued"
	| "canceling"
	| "cancelled"
	| "transferring"
	| "transferred";
type TSecOfMin =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32
	| 33
	| 34
	| 35
	| 36
	| 37
	| 38
	| 39
	| 40
	| 41
	| 42
	| 43
	| 44
	| 45
	| 46
	| 47
	| 48
	| 49
	| 50
	| 51
	| 52
	| 53
	| 54
	| 55
	| 56
	| 57
	| 58
	| 59;
type TMinOfHour =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32
	| 33
	| 34
	| 35
	| 36
	| 37
	| 38
	| 39
	| 40
	| 41
	| 42
	| 43
	| 44
	| 45
	| 46
	| 47
	| 48
	| 49
	| 50
	| 51
	| 52
	| 53
	| 54
	| 55
	| 56
	| 57
	| 58
	| 59;
type THourOfDay =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23;
type TDayOfWeek =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 101 // Weekend: Saturday and Sunday
	| 102 // Week days: Monday to Friday
	| 103; // All days: Monday to Sunday
type TDayOfMonth =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31;
type TMonthOfYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Optional<T> = {
	[K in keyof T]: T[K] | undefined;
};

type TFields_system =
	| "created_by"
	| "created_time"
	| "last_user_update_by"
	| "last_user_update_time"
	| "is_del"
	| "deleted_at"
	| "ver";

// TODO: review type
type TFields_v2_creative_ui = TFields_v2_creatives &
	TFields_v2_creative_assets & {
		is_asset_published?: TFields_v2_creative_assets["is_published"];
		is_asset_del?: TFields_v2_creative_assets["is_del"];
		// asset_review_status: TFields_v2_creative_assets['review_status']
	} & Pick<TFields_v2_sub_group, "adsformat_id" | "ads_type" | "sizetp_id"> & {
		is_grp_published?: TFields_v2_groups["is_published"];
		is_grp_del?: TFields_v2_groups["is_del"];
		// grp_review_status: TFields_v2_groups['review_status']
	} & {
		is_cpgn_published?: TFields_v2_campaigns["is_published"];
		is_cpgn_del?: TFields_v2_campaigns["is_del"];
		// cpgn_review_status: TFields_v2_campaigns['review_status']
	};

type TV2GroupWithChildren = TFields_v2_groups_ui & { schedule_segments: TScheduleSegment[] } & {
	v2_creatives: TFields_v2_creative_ui[];
};

type TV2CampaignWithChildren = TFields_v2_campaigns & {
	v2_groups: TV2GroupWithChildren[];
};

type TV2TableName =
	| "v2_adsformat"
	| "v2_banner"
	| "v2_campaigns"
	| "v2_companion"
	| "v2_creatives"
	| "v2_creative_assets"
	| "v2_group_schedule"
	| "v2_groups"
	| "v2_profile"
	| "v2_publisher_setting"
	| "v2_publisher"
	| "v2_size_template"
	| "v2_static_file"
	| "v2_sub_account"
	| "v2_sub_group"
	| "v2_target_category"
	| "v2_target_channel"
	| "v2_term"
	| "v2_time_intervals"
	| "v2_upload_draft"
	| "v2_video"
	| "v2_zone_adsformat"
	| "v2_zone";

type TTransParm = string;

type TValidationResult<T> = {
	table_name?: string;
	field_name?: keyof T | "";
	acc_id?: any;
	record_id?: any;
	message?: string;
};

type TCurrencyCreditMap = {
	[key: string]: number;
};

type TUTCOffset = {
	years: number;
	mons: number;
	days: number;
	hours: number;
	mins: number;
	secs: number;
};

type TTimeZone = {
	name: string;
	abbrev: string;
	utc_offset: TUTCOffset;
	is_dst: boolean;
};

type TThirdPartyInfo = {
	third_party_acc_id: string;
	third_party_authorizer_endpoint: string;
	third_party_authorizer_id: TThirdParty;
};

type TAdBusinessInfo = Partial<TFieldDefV2Profile_Copy>;

type TAdMeta = {
	id: string;
	title: string;
};

type TPotentialAd = {
	crtv_id: string;
	is_gd_ad: boolean;
	rate_limit: boolean;
	country_iso_code: string;
	skipping_ads: boolean;
	is_404: boolean;
};

type TLocationQuery = {
	continent_code: string;
	country_iso_code: string;
	subdivision_1_iso_code: string;
	city_name: string;
	search_text?: string;
	_offset?: number;
	_limit?: number;
};

type TLocationFound = {
	continent_code: string;
	continent_name: string;
	country_iso_code: string;
	country_name: string;
	subdivision_1_iso_code: string;
	subdivision_1_name: string;
	city_name: string;
	similarity?: number;
};

type TGeoData = {
	geoname_id: string;
	locale_code: string;
	continent_code: string;
	continent_name: string;
	country_iso_code: string;
	country_name: string;
	subdivision_1_iso_code: string;
	subdivision_1_name: string;
	subdivision_2_iso_code: string;
	subdivision_2_name: string;
	city_name: string;
	metro_code: number;
	time_zone: string;
	similarity?: number;
};

type TScheduleSegment = {
	day_of_week: TDayOfWeek;
	begin_hour_24: THourOfDay;
	begin_minute: TMinOfHour;
	end_hour_24: THourOfDay;
	end_minute: TMinOfHour;
};

type TScheduleSegment_Expanded = TScheduleSegment & { source: TDayOfWeek };

type TLocationDetail = {
	continent_code: string;
	country_iso_code: string;
	subdivision_1_iso_code: string;
	city_name_en: string;
};

type TFieldDefV2Profile_Copy = {
	gjw_eco_id: string;
	gjw_eco_email: string;
	gjw_eco_email_verified: boolean;
	gjw_eco_first_name: string;
	gjw_eco_last_name: string;
	gjw_eco_phone_number: string;
	gjw_eco_avata_url: string;
	iat: number;
	exp: number;
	sub_acc_id: string;
	prf_business_name: string;
	prf_business_website: string;
	prf_country_id: string;
	prf_country_name: string;
	prf_addr_line_1: string;
	prf_addr_line_2: string;
	prf_town_city_id: string;
	prf_town_city_name: string;
	prf_province_state_id: string;
	prf_province_state_name: string;
	prf_postcode: string;
	prf_business_phone_number: string;
	prf_language: string;
	advertiser_time_zone_utcoffset: TUTCOffset;
	advertiser_time_zone_abbrev: string;
	advertiser_time_zone_name: string;
	advertiser_time_zone_is_dst: boolean;
	prf_currency_code_iso4217: string;
	prf_currency_name: string;
	prf_currency_symbol: string;
	prf_stripe_id: string;
	prf_review_status: TGJWBusinessValidationStatus;
	prf_review_deny_reason: string;
	term_id: string;
	is_term_accepted: boolean;
};

type TFields_v2_target_category = TFields_ads_categories;
type TFields_v2_target_channel = TFields_ads_channels;

type TCreativeFormInput = Pick<
	TFields_v2_creatives,
	| "sub_acc_id"
	| "cpgn_id"
	| "crtv_id"
	| "grp_id"
	| "sgrp_id"
	| "crtv_asset_id"
	| "companion_id"
	| "crtv_name"
	| "landing_page"
	| "crtv_utm"
	| "is_published"
	| "landing_page_target"
	| "crtv_status"
	| "crtv_review_status"
	| "is_del"
	| "is_enabled"
	| "alr_rejected_reason_id"
	| "ldpg_rejected_reason_id"
> &
	Pick<
		TFields_v2_creative_assets,
		| "crtv_slogan"
		| "crtv_slogan_detail"
		| "crtv_icon_url"
		| "crtv_icon_name"
		| "crtv_button_text"
		| "crtv_width"
		| "crtv_height"
		| "disp_img_url"
		| "vid_src_url"
		| "vid_page_url"
		| "vid_preview_img_url"
		| "vid_duration_sec"
	> &
	Modify<Pick<TFields_v2_creatives, "ads_type">, { ads_type?: TAdsType }> &
	Pick<TFields_v2_sub_group, "adsformat_id" | "sizetp_id"> & {
		// Do we need new fields?
		previewUrl?: string;
	};

type TAssetFormModel = Pick<
	TFields_v2_creative_assets,
	| "sub_acc_id"
	| "crtv_asset_status"
	| "asset_review_status"
	// General fields
	| "crtv_asset_id"
	| "crtv_asset_name"
	| "keywords"
	| "is_published"
	| "is_del"
	| "is_enabled"
	| "crtv_slogan_detail" // Ad title
	// Video asset field
	| "vid_page_url"
	// Display asset fields
	| "disp_img_url"
	| "crtv_height"
	| "crtv_width"
	// Infeed and Shorts asset fields
	| "crtv_icon_url"
	| "crtv_icon_name" // Business name
	| "crtv_button_text" // Call to action
	// Rejected reason
	| "asset_rejected_reason_id"
> &
	Pick<TFields_v2_size_template, "sizetp_id"> &
	Modify<Pick<TFields_v2_creative_assets, "ads_type">, { ads_type?: TAdsType }>;

type TAdPreviewUrlData = Pick<TFields_v2_zone, "zone_id" | "zone_name" | "zone_desc"> & {
	preview_url: string;
};

type TFields_msg_ext = TFields_msg & Partial<Pick<TFields_User, "user_name">>;

interface TFields_User {
	max_ad_accounts?: number;
	max_mgr_accounts?: number;
	max_account_accesses?: number;
	max_ad_accounts_internal?: number;
	max_mgr_accounts_internal?: number;
	max_account_accesses_internal?: number;
}

type TTagValidationResult = {
	/** A string of comma separated valid tag_ids sorted in alphabetic order */
	valid: string;
	/** A string of comma separated invalid tag_ids. */
	invalid: string;
};

type TImageFormatDimInfo = {
	format: TImageFormat;
	width: number;
	height: number;
};
type TConfigImageSizeLimits = {
	[field_name in "crtv_icon_url" | "disp_img_url"]: Record<TImageFormat, number>;
};

//--------------------------------------------------------------------------------------
// Payment Config
//--------------------------------------------------------------------------------------
/**
 * - `PAID`: the payment gateway charged successfully
 * - `COMPLETED`: after the order is `PAID`, the GJW Payment system will do some additional
 * actions, like granting entitlement, send confirmation emails, etc. If all of these
 * actions are done, the order will be marked as `COMPLETED`
 */
type TGJWOrderStatus = "CREATED" | "COMPLETED" | "PAID";

type TPaymentMethodType = "default" | "backup";

type TAccountBalance = {
	ads_sub_acc_name: string;
	sub_acc_id: string;
	balance: number;
} & Pick<TFields_v2_sub_account, "linked_pmt_prf_id" | "linked_pmt_sub_acc_id"> & {
		linked_pmt_prf_name: string;
	};

type TAccountBalanceAlert = {
	/** The Ad account ID for which the alert is triggered */
	sub_acc_id: string;
	/** The balance of the Ad account */
	balance: number;
};

type TAccountPaymentStatus =
	| "initial"
	| "ok"
	| "payment_required"
	| "low_balance"
	| "low_balance_setup_required"
	| "setup_required"
	| "payment_setup_required";

type TPaymentError_Type = "billing_stmt";

type TPaymentProfile_Type = "individual" | "organization";

type TPaymentProfileLinkHistStatus = 1 | 0;

/**
 * - processing: the ad account is being prepared to be charged
 * - pending: a previous recharge attempt failed, a next retry attempt is pending
 * - failed: the maximum number of recharge attempts have been reached; manual resolution is needed
 */
type TRechargeQueueStatus = "processing" | "pending" | "failed";
