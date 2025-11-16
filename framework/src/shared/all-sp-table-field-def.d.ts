type TFields_account_hierarchy = {
    /**sub_acc_id of top level ancestor (Type: string) */
	lv0?: string; 
    /** (Type: string) */
	lv1?: string; 
    /** (Type: string) */
	lv2?: string; 
    /** (Type: string) */
	lv3?: string; 
    /** (Type: string) */
	lv4?: string; 
    /** (Type: string) */
	lv5?: string; 
    /** (Type: string) */
	lv6?: string; 
    /** (Type: string) */
	status?: string; 
    /** (Type: timestamp) */
	created_time: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: timestamp) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
};


type TFields_account_identifiers = {
    /**Record Id (Type: string) */
	sub_acc_id: string; 
    /**10 digit, like phone number (Type: bigint) */
	account_id: number; 
    /**Time the record last updated (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
};


type TFields_ads_categories = {
    /**Record Id (Type: string) */
	cat_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	cat_description?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
};


type TFields_ads_channels = {
    /**Record Id (Type: string) */
	chl_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	chl_description?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
};


type TFields_ClickHouse = {
    /**Record Id (Type: string) */
	id: string; 
    /**Required, visually identifies the record. (Type: string) */
	rec_name?: string; 
    /**Owner of the user id (Type: string) */
	user_id: string; 
    /**Time the record last updated (Type: decimal) */
	timestamp: number; 
    /** (Type: string) */
	sub_acc_id?: string; 
    /** (Type: string) */
	cpgn_id?: string; 
    /** (Type: string) */
	grp_id?: string; 
    /** (Type: string) */
	crtv_id?: string; 
};


type TFields_geoip2_location_en = {
    /** (Type: string) */
	continent_code: string; 
    /** (Type: string) */
	continent_name: string; 
    /** (Type: string) */
	country_iso_code?: string; 
    /** (Type: string) */
	country_name?: string; 
    /** (Type: string) */
	subdivision_1_iso_code?: string; 
    /** (Type: string) */
	subdivision_1_name?: string; 
    /** (Type: string) */
	city_name?: string; 
    /** (Type: string) */
	county_name?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
};


type TFields_hb_info = {
    /** (Type: string) */
	req_id: string; 
    /** (Type: timestamp) */
	event_time: any; 
    /** (Type: timestamp) */
	send_time: any; 
    /** (Type: string) */
	event_name: string; 
    /** (Type: string) */
	extra_data?: string; 
    /** (Type: string) */
	ad_unit_code?: string; 
    /** (Type: boolean) */
	allow_prebid?: boolean; 
    /** (Type: boolean) */
	is_cmp_loaded?: boolean; 
    /** (Type: boolean) */
	is_js_loaded?: boolean; 
    /** (Type: boolean) */
	retry?: boolean; 
    /** (Type: string) */
	bidder?: string; 
    /** (Type: string) */
	error_msg?: string; 
    /** (Type: float) */
	cpm?: number; 
    /** (Type: integer) */
	time_to_respond?: number; 
    /** (Type: string) */
	reject_reason?: string; 
    /** (Type: string) */
	region?: string; 
    /** (Type: timestamp) */
	created_time?: any; 
    /** (Type: string) */
	auction_id?: string; 
};


type TFields_latest_hourly_balance = {
    /**Ad account ID (Type: string) */
	sub_acc_id: string; 
    /**The most recently calculated ad account balance, updated every hour. (Type: bigint) */
	balance: string; 
    /**The time of the last payment. (Type: datetime) */
	last_paid_time?: any; 
    /**The time of the last accumulated ads spend. (Type: datetime) */
	last_cost_time?: any; 
};


type TFields_location_county = {
    /** (Type: string) */
	country_alpha2_code?: string; 
    /** (Type: string) */
	region_code?: string; 
    /** (Type: string) */
	city_name?: string; 
    /** (Type: string) */
	county_name?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
};


type TFields_payment_error = {
    /**error id (Type: string) */
	id: string; 
    /**the ad sub_acc_id for which the billing statement failed Id (Type: string) */
	sub_acc_id: string; 
    /**error type, i.e. billing statement or something else (Type: string) */
	type: TPaymentError_Type; 
    /**Error details in JSON format (Type: json) */
	payload: any; 
    /**Time the error was created / added (Type: datetime) */
	timestamp: any; 
    /** (Type: string) */
	filter_key?: string; 
    /** (Type: string) */
	filter_value?: string; 
};


type TFields_rv_reject_reasons = {
    /**Record Id (Type: string) */
	reject_reason_id: string; 
    /**Owner/creator of the record (Type: string) */
	user_id: string; 
    /**Time the record last updated (Type: decimal) */
	timestamp: number; 
    /** (Type: string) */
	reject_reason: string; 
    /** (Type: string) */
	reject_reason_desc?: string; 
    /** (Type: string) */
	reject_template?: string; 
    /** (Type: string) */
	review_type: TRjType; 
};


type TFields_rv_review_jobs = {
    /**Record Id (Type: string) */
	review_job_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	type?: TRjType; 
    /**The json used to record a snapshot of content to be reviewed  (Type: string) */
	resource_json: TRjResourceJson; 
    /** (Type: string) */
	queue?: string; 
    /** (Type: string) */
	last_reviewer_id?: string; 
    /** (Type: string) */
	last_claimed_by?: string; 
    /** (Type: timestamp) */
	enqueued_at?: any; 
    /** (Type: integer) */
	priority?: number; 
    /** (Type: timestamp) */
	assigned_at?: any; 
    /** (Type: timestamp) */
	expire_at?: any; 
    /** (Type: timestamp) */
	started_at?: any; 
    /** (Type: timestamp) */
	decided_at?: any; 
    /** (Type: string) */
	result?: TRjResult; 
    /** (Type: string) */
	enqueue_status?: TRjEnqueueStatus; 
    /** (Type: string) */
	result_detail?: TRjResultDetail; 
    /** (Type: string) */
	result_id?: string; 
    /** (Type: boolean) */
	is_applied?: boolean; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: integer) */
	ver: number; 
};


type TFields_rv_review_results_manual = {
    /**Record Id (Type: string) */
	result_id: string; 
    /** (Type: string) */
	review_job_id: string; 
    /** (Type: string) */
	result: TRjResult; 
    /** (Type: string) */
	result_detail?: TRjResultDetail; 
    /** (Type: string) */
	reviewer_id: string; 
    /** (Type: timestamp) */
	assigned_at?: any; 
    /** (Type: integer) */
	handling_time_ms?: number; 
    /** (Type: timestamp) */
	decided_at?: any; 
    /**Owner/creator of the record (Type: string) */
	created_by?: string; 
    /**Time the record last updated (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
};


type TFields_rv_reviewers = {
    /**Record Id (Type: string) */
	reviewer_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	reviewer_name?: string; 
    /** (Type: integer) */
	reviewer_level?: number; 
    /**Owner/creator of the record (Type: string) */
	last_user_update_by: string; 
    /**Time the record last updated (Type: decimal) */
	last_user_update_time: number; 
    /** (Type: string) */
	user_id: string; 
};


type TFields_v2_adsformat = {
    /**Record Id (Type: string) */
	adsformat_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	adsformat_name: string; 
    /** (Type: string) */
	adsformat_desc?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_adstype_sizetp = {
    /**Record Id (Type: string) */
	adstype_sizetp_id: string; 
    /**Required (Type: string) */
	ads_type: string; 
    /**Owner of the user id (Type: string) */
	sizetp_id: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_applied_payments = {
    /** (Type: string) */
	applied_pmt_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	ad_spend_id: string; 
    /** (Type: string) */
	payment_id?: string; 
    /** (Type: string) */
	bal_adj_id?: string; 
    /** (Type: bigint) */
	applied_amount: number; 
    /** (Type: bigint) */
	ending_balance: number; 
    /** (Type: datetime) */
	applied_time?: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_balance_adjustments = {
    /**part of PK (Type: string) */
	bal_adj_id: string; 
    /**part of PK (Type: string) */
	sub_acc_id: string; 
    /** (Type: bigint) */
	adj_amount: string; 
    /** (Type: datetime) */
	adj_time: any; 
    /** (Type: bigint) */
	applied_amount: string; 
    /** (Type: bigint) */
	unapplied_amount: string; 
    /** (Type: string) */
	notes?: string; 
    /** (Type: datetime) */
	created_time_utc?: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_balance_adjustments_manual = {
    /**Part of PK; Main record identifier (Type: string) */
	manual_adj_id: string; 
    /**Part of PK; Ad account ID, the balance of which is adjusted. (Type: string) */
	sub_acc_id: string; 
    /**Adjustment amount in US cents. (Type: bigint) */
	adj_amount: string; 
    /**Adjustment time (Type: datetime) */
	adj_time: any; 
    /**Description related to the adjustment, such as a reason why the adjustment was made. (Type: string) */
	notes?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_banner = {
    /**Record Id (Type: string) */
	banner_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	disp_img_url?: string; 
    /** (Type: string) */
	disp_text_below_image?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: datetime) */
	deleted_at?: any; 
};


type TFields_v2_campaigns = {
    /**Record Id (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	cpgn_name: string; 
    /** (Type: string) */
	cpgn_type?: string; 
    /** (Type: string) */
	gui_cpgn_type?: string; 
    /** (Type: string) */
	cpgn_subtype?: string; 
    /** (Type: string) */
	cpgn_status?: string; 
    /** (Type: string) */
	bid_strategy?: string; 
    /** (Type: integer) */
	max_bidding_price?: number; 
    /** (Type: string) */
	cpgn_budget_duration_type?: string; 
    /** (Type: float) */
	cpgn_budget_min?: number; 
    /** (Type: smallint) */
	line_item_type?: number; 
    /** (Type: integer) */
	tgt_day_cpgn_budget_value?: number; 
    /** (Type: string) */
	cpgn_pacing_type?: string; 
    /** (Type: string) */
	freq_cap_level?: string; 
    /** (Type: string) */
	freq_cap_cycle?: string; 
    /** (Type: smallint) */
	freq_cap_value?: number; 
    /** (Type: datetime) */
	start_date?: any; 
    /** (Type: datetime) */
	end_date?: any; 
    /** (Type: boolean) */
	is_end_date_set?: boolean; 
    /** (Type: bigint) */
	tgt_tot_cpgn_imp?: number; 
    /** (Type: bigint) */
	tgt_day_cpgn_imp?: number; 
    /** (Type: string) */
	tgt_delivery_languages?: string; 
    /** (Type: string) */
	tgt_delivery_locations?: string; 
    /** (Type: string) */
	tgt_delivery_locations_ui?: string; 
    /** (Type: string) */
	not_include_languages?: string; 
    /** (Type: string) */
	not_include_locations?: string; 
    /** (Type: string) */
	not_include_locations_ui?: string; 
    /** (Type: boolean) */
	is_tgt_delivery_locations_all?: boolean; 
    /**Used by internal ads operators to target special tags. (Type: string) */
	tgt_delivery_stags?: string; 
    /** (Type: boolean) */
	vid_skippable?: boolean; 
    /** (Type: string) */
	cpgn_utm?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: boolean) */
	is_enabled: boolean; 
};


type TFields_v2_companion = {
    /**Record Id (Type: string) */
	companion_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	comment?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_config = {
    /** (Type: string) */
	region?: string; 
    /** (Type: string) */
	env_key: string; 
    /** (Type: string) */
	env_value?: string; 
    /** (Type: string) */
	comment?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_creative_assets = {
    /**Record Id (Type: string) */
	crtv_asset_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	crtv_asset_name: string; 
    /** (Type: string) */
	crtv_asset_status?: string; 
    /** (Type: string) */
	ads_type: string; 
    /** (Type: string) */
	sizetp_id?: string; 
    /** (Type: string) */
	keywords?: string; 
    /** (Type: string) */
	crtv_slogan?: string; 
    /** (Type: string) */
	crtv_slogan_detail?: string; 
    /** (Type: string) */
	crtv_icon_url?: string; 
    /**SHA-256 of the image pixels data at crtv_icon_url (Type: string) */
	crtv_icon_hash?: string; 
    /** (Type: string) */
	crtv_icon_name?: string; 
    /** (Type: string) */
	crtv_button_text?: string; 
    /** (Type: smallint) */
	crtv_width?: number; 
    /** (Type: smallint) */
	crtv_height?: number; 
    /** (Type: string) */
	disp_img_url?: string; 
    /**SHA-256 of the image pixels data at disp_img_url (Type: string) */
	disp_img_hash?: string; 
    /** (Type: string) */
	vid_content_id?: string; 
    /** (Type: string) */
	vid_src_url?: string; 
    /** (Type: string) */
	vid_page_url?: string; 
    /** (Type: string) */
	vid_preview_img_url?: string; 
    /** (Type: integer) */
	vid_duration_sec?: number; 
    /**SHA-256 of the all asset content text fields (Type: string) */
	crtv_asset_hash?: string; 
    /** (Type: datetime) */
	created_time: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: boolean) */
	is_enabled?: boolean; 
    /** (Type: string) */
	asset_review_status?: TAdReviewStatus; 
    /** (Type: string) */
	asset_rejected_reason_id?: string; 
};


type TFields_v2_creative_statistics_hourly = {
    /** (Type: datetime) */
	aggr_hr: any; 
    /** (Type: string) */
	crtv_id: string; 
    /** (Type: integer) */
	act_hr_crtv_clicks?: number; 
    /** (Type: bigint) */
	act_hr_crtv_delivery?: number; 
    /** (Type: bigint) */
	tgt_hr_crtv_imp?: number; 
    /** (Type: bigint) */
	act_hr_crtv_imp?: number; 
    /** (Type: integer) */
	act_hr_crtv_views?: number; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
};


type TFields_v2_creatives = {
    /**Record Id (Type: string) */
	crtv_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	crtv_name: string; 
    /** (Type: string) */
	sgrp_id?: string; 
    /** (Type: string) */
	grp_id: string; 
    /** (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	crtv_asset_id?: string; 
    /** (Type: string) */
	crtv_carrier_type?: string; 
    /** (Type: string) */
	crtv_status?: string; 
    /** (Type: string) */
	crtv_description?: string; 
    /** (Type: string) */
	landing_page?: string; 
    /** (Type: string) */
	note?: string; 
    /** (Type: string) */
	landing_page_target?: string; 
    /** (Type: string) */
	crtv_alt_text?: string; 
    /** (Type: string) */
	crtv_status_text?: string; 
    /** (Type: boolean) */
	is_companion_master?: boolean; 
    /** (Type: string) */
	companion_id?: string; 
    /** (Type: string) */
	crtv_utm?: string; 
    /** (Type: string) */
	ads_type?: string; 
    /** (Type: string) */
	vid_billing_method?: string; 
    /** (Type: datetime) */
	created_time: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: boolean) */
	is_enabled?: boolean; 
    /** (Type: string) */
	ldpg_hash?: string; 
    /** (Type: string) */
	ldpg_review_status?: TAdReviewStatus; 
    /** (Type: datetime) */
	ldpg_reviewed_at?: any; 
    /** (Type: string) */
	alr_review_status?: TAdReviewStatus; 
    /** (Type: string) */
	crtv_review_status?: TAdReviewStatus; 
    /** (Type: string) */
	alr_rejected_reason_id?: string; 
    /** (Type: string) */
	ldpg_rejected_reason_id?: string; 
    /**Previous AssetLdpgRelation reviewJob id under review (Type: string) */
	prev_alr?: string; 
    /**version number to avoid write conflict (Type: integer) */
	ver: number; 
};


type TFields_v2_daily_account_balance = {
    /**part of PK (Type: string) */
	acc_bal_id: string; 
    /**Part of PK (Type: string) */
	sub_acc_id: string; 
    /**the total amount of payments on the day of date, v2_payments.paid_amount (Type: bigint) */
	daily_paid_amount?: number; 
    /**the total amount of unapplied payments on the day of date, v2_payments.unapplied_amount (Type: bigint) */
	daily_payment_unapplied?: number; 
    /**the total amount of ad spend on the day of date, v2_daily_ad_spend.amount (Type: bigint) */
	daily_spend_amount?: number; 
    /**the total applied ad spend on the day of date, v2_daily_ad_spend.amount - v2_daily_ad_spend.balance (Type: bigint) */
	daily_applied_spend?: number; 
    /**the total unapplied ad spend on the day of date, v2_daily_ad_spend.balance (Type: bigint) */
	daily_spend_balance?: number; 
    /**the total adjustment amount on the day of date, v2_balance_adjustments.adj_amount (Type: bigint) */
	daily_adj_amount?: number; 
    /**the total unapplied adjustments on the day of date, v2_balance_adjustments.unapplied_amount (Type: bigint) */
	daily_adj_unapplied?: number; 
    /**previous day's after_balance_amount (Type: bigint) */
	before_payment_unapplied?: number; 
    /**the total unapplied payments up to the date, v2_payments.unapplied_amount (Type: bigint) */
	after_payment_unapplied?: number; 
    /**previous day's after_total_unapplied_spend (Type: bigint) */
	before_total_spend_balance?: number; 
    /**the total unapplied ad spend up to the date, v2_daily_ad_spend.balance (Type: bigint) */
	after_total_spend_balance?: number; 
    /**the previous day's after_adj_amount (Type: bigint) */
	before_adj_unapplied?: number; 
    /**the total unapplied adjustments up to the date, v2_balance_adjustments.unapplied_amount (Type: bigint) */
	after_adj_unapplied?: number; 
    /**= before_balance_amount + daily_paid_amount + before_adj_amount + daily_adj_amount - after_balance_amount - after_adj_amount (Type: bigint) */
	applied_previous_spend?: number; 
    /** (Type: date) */
	date: any; 
    /** (Type: date) */
	eff_date: any; 
    /** (Type: date) */
	end_date: any; 
    /** (Type: tinyint) */
	is_most_recent: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_daily_ad_spend = {
    /**part of PK (Type: string) */
	ad_spend_id: string; 
    /**part of pk (Type: string) */
	sub_acc_id: string; 
    /** (Type: bigint) */
	amount: number; 
    /**Time the record last updated (Type: date) */
	date: any; 
    /** (Type: bigint) */
	balance: number; 
    /**Paid | PartialPaid (Type: string) */
	paymentstatus?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_fp_ratio_language = {
    /** (Type: string) */
	id: string; 
    /** (Type: string) */
	language: string; 
    /** (Type: float) */
	ratio: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_fp_ratio_location = {
    /** (Type: string) */
	id: string; 
    /** (Type: string) */
	country: string; 
    /**Only for US, CA and TW. (Type: string) */
	state?: string; 
    /** (Type: string) */
	time_zone_name: string; 
    /** (Type: float) */
	ratio: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_groups = {
    /**Record Id (Type: string) */
	grp_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	grp_name: string; 
    /** (Type: string) */
	grp_type?: string; 
    /** (Type: string) */
	grp_status?: string; 
    /** (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	tgt_device_types?: string; 
    /** (Type: string) */
	tgt_delivery_categories?: string; 
    /** (Type: string) */
	tgt_delivery_channels?: string; 
    /** (Type: string) */
	tgt_delivery_tags?: string; 
    /** (Type: string) */
	tgt_delivery_hashtags?: string; 
    /** (Type: string) */
	tgt_policy_ids?: string; 
    /** (Type: boolean) */
	is_tgt_channels?: boolean; 
    /** (Type: string) */
	not_include_categories?: string; 
    /** (Type: string) */
	not_include_channels?: string; 
    /** (Type: string) */
	not_include_tags?: string; 
    /** (Type: boolean) */
	is_full_duration?: boolean; 
    /** (Type: boolean) */
	is_day_grp_budget_limits_on?: boolean; 
    /** (Type: float) */
	day_grp_max_budget?: number; 
    /** (Type: float) */
	tgt_day_grp_budget_value?: number; 
    /**Targeted daily group impressions (Type: bigint) */
	tgt_day_grp_imp?: number; 
    /** (Type: integer) */
	max_bidding_price?: number; 
    /** (Type: string) */
	grp_freq_cap_cycle?: string; 
    /** (Type: smallint) */
	grp_freq_cap_value?: number; 
    /** (Type: string) */
	grp_utm?: string; 
    /** (Type: json) */
	schedule_segments?: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: boolean) */
	is_enabled?: boolean; 
};


type TFields_v2_gui_cpgn_type_mapping = {
    /**Record Id (Type: string) */
	id: string; 
    /**Required, visually identifies the record. (Type: string) */
	gui_cpgn_type: string; 
    /** (Type: string) */
	cpgn_type: string; 
    /** (Type: string) */
	ads_type: string; 
    /**Owner of the user id (Type: string) */
	user_id: string; 
    /** (Type: string) */
	zone_ads_type: string; 
    /**Time the record last updated (Type: datetime) */
	last_user_update_time?: any; 
};


type TFields_v2_language = {
    /**Record Id (Type: string) */
	lang_name: string; 
    /** (Type: string) */
	lang_descr?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: smallint) */
	lang_no?: number; 
};


type TFields_v2_main_account = {
    /**Record Id (Type: string) */
	main_acc_id: string; 
    /** (Type: string) */
	main_acc_name?: string; 
    /** (Type: string) */
	main_acc_business_name?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /**Owner of the user id (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: string) */
	country_iso_code?: string; 
    /** (Type: string) */
	currency_code_iso4217?: string; 
    /** (Type: string) */
	advertiser_time_zone_name?: string; 
};


type TFields_v2_monthly_account_balance = {
    /** (Type: string) */
	period: string; 
    /**Ad account ID (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	pmt_prf_id: string; 
    /** (Type: string) */
	pmt_sub_acc_id: string; 
    /**yyyy-mm-dd date to start to apply the pmt profile (Type: date) */
	prf_start_date: string; 
    /**yyyy-mm-dd date to stop applying the pmt profile (Type: date) */
	prf_end_date: string; 
    /** (Type: integer) */
	active: number; 
    /** (Type: bigint) */
	opening_balance_from_payments: string; 
    /** (Type: bigint) */
	opening_balance_adj: string; 
    /** (Type: bigint) */
	opening_spend_balance: string; 
    /** (Type: bigint) */
	closing_balance_from_payments: string; 
    /** (Type: bigint) */
	closing_balance_from_adj: string; 
    /** (Type: bigint) */
	closing_spend_balance: string; 
    /** (Type: bigint) */
	total_payments_received: string; 
    /** (Type: bigint) */
	total_adjustment_amount: string; 
    /** (Type: bigint) */
	total_ad_spend: string; 
    /** (Type: bigint) */
	tax?: string; 
    /**File path to the statement pdf stored in the private S3 bucket. (Type: string) */
	statement_uri?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
};


type TFields_v2_monthly_campaign_spend = {
    /**Record Id (Type: string) */
	id: string; 
    /** (Type: datetime) */
	month: any; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	bid_strategy: string; 
    /** (Type: bigint) */
	cost: string; 
    /** (Type: bigint) */
	adjustment: string; 
    /** (Type: string) */
	adj_ids?: string; 
    /** (Type: string) */
	adj_months?: string; 
    /** (Type: string) */
	note?: string; 
    /**Monthly campaign impressions (Type: bigint) */
	imp: string; 
    /**Monthly campaign clicks (Type: bigint) */
	click: string; 
    /** (Type: timestamp) */
	created_at: any; 
    /** (Type: timestamp) */
	updated_at: any; 
};


type TFields_v2_multi_video_rule = {
    /** (Type: string) */
	multi_video_rule_id?: string; 
    /** (Type: string) */
	publisher_id?: string; 
    /** (Type: string) */
	location?: string; 
    /** (Type: string) */
	language?: string; 
    /** (Type: string) */
	tag?: string; 
    /** (Type: string) */
	adspot?: string; 
    /** (Type: smallint) */
	ratio?: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_payment_locks = {
    /**Record Id (Type: string) */
	id: string; 
    /**The date before which all payment data are locked from modification (Type: date) */
	date: any; 
    /**Indicates whether the lock is active or not. Only the latest record should be maintained as active. (Type: smallint) */
	active: number; 
    /**Time the record last updated (Type: datetime) */
	lock_time: any; 
    /** (Type: datetime) */
	updated_time?: any; 
};


type TFields_v2_payment_methods = {
    /**Record Id (Type: string) */
	pmt_method_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	pmt_prf_id: string; 
    /**Payment method type: default | backup (Type: string) */
	type: TPaymentMethodType; 
    /** (Type: string) */
	gtwy_acc_id: string; 
    /** (Type: string) */
	gtwy_cus_id: string; 
    /** (Type: string) */
	gtwy_pmt_method_id: string; 
    /** (Type: string) */
	description: string; 
    /**Store the customer's country and postal code in an encrypted form. Used for calculating tax in offline payments. (Type: string) */
	billing_address: string; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /**soft delete (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_payment_profiles = {
    /**part of primary key (Type: string) */
	pmt_prf_id: string; 
    /**part of primary key (Type: string) */
	sub_acc_id: string; 
    /** (Type: string) */
	pmt_prf_name: string; 
    /**Payment profile type: "individual" | "organization" (Type: string) */
	type: TPaymentProfile_Type; 
    /**encrypted (Type: string) */
	legal_name: string; 
    /** (Type: string) */
	org_name?: string; 
    /**encrypted (Type: string) */
	email: string; 
    /**encrypted (Type: string) */
	phone?: string; 
    /**2-letter code (not digits national code); encrypted (Type: string) */
	phone_country_code?: string; 
    /**encrypted (Type: string) */
	address_postal_code: string; 
    /**encrypted (Type: string) */
	address_country: string; 
    /** (Type: boolean) */
	is_mgr?: boolean; 
    /**Owner (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /**soft delete (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_payments = {
    /**Payment ID, is constructed either from the GJW order_id or the manual payment ID. (Type: string) */
	payment_id: string; 
    /**The ID of the Ad account that was topped up (Type: string) */
	sub_acc_id: string; 
    /**The payment profile ID associated with the payment (Type: string) */
	pmt_prf_id: string; 
    /**The subaccount ID of the payment profile, which can be of an Ad or a Manager account (Type: string) */
	pmt_sub_acc_id: string; 
    /**GJW order status (Type: string) */
	status: TGJWOrderStatus; 
    /**The subtotal of the order (excluding tax); this is what is counted toward the account balance (Type: bigint) */
	paid_amount: string; 
    /** (Type: bigint) */
	applied_amount: string; 
    /** (Type: bigint) */
	unapplied_amount: string; 
    /** (Type: bigint) */
	tax: string; 
    /** (Type: bigint) */
	gtwy_fee: string; 
    /** (Type: bigint) */
	total_amount: string; 
    /** (Type: bigint) */
	refund?: string; 
    /**File path to the invoice pdf stored in the private S3 bucket. (Type: string) */
	invoice_uri?: string; 
    /** (Type: string) */
	gjw_user_id: string; 
    /** (Type: datetime) */
	paid_time: any; 
    /** (Type: datetime) */
	paid_time_utc: any; 
    /**Description that would show up in the billing statement's payments section, such as the last 4 digit of the credit card used for the payment. (Type: string) */
	description: string; 
    /**Time the record last updated (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_payments_manual = {
    /**Manual payment ID (Type: string) */
	manual_pmt_id: string; 
    /**Ad account ID for which the payment is applied (Type: string) */
	sub_acc_id: string; 
    /**completed | refunded | partially_refunded (Type: string) */
	status: TGJWOrderStatus; 
    /** (Type: bigint) */
	paid_amount: string; 
    /** (Type: bigint) */
	tax: string; 
    /** (Type: bigint) */
	processing_fee?: string; 
    /** (Type: bigint) */
	refund?: string; 
    /** (Type: datetime) */
	paid_time: any; 
    /**Description that would show up in the billing statement's payments section. (Type: string) */
	description: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
};


type TFields_v2_pmt_prf_links = {
    /**PK field (Type: string) */
	link_id?: string; 
    /**PK field. Linked payment subaccount ID. Citus distribution column (Type: string) */
	linked_pmt_sub_acc_id: string; 
    /**Linked payment profile ID (Type: string) */
	linked_pmt_prf_id: string; 
    /**Ad account ID linked to the payment profile (Type: string) */
	sub_acc_id: string; 
    /**Identical to linked_by in meaning (Type: string) */
	created_by?: string; 
    /**Identical to link_time in meaning (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	updated_by?: string; 
    /** (Type: datetime) */
	updated_time?: any; 
};


type TFields_v2_pmt_prf_links_history = {
    /**PK field (Type: string) */
	link_his_id: string; 
    /**PK field. Ad account ID linked to the payment profile. Citus distribution column (Type: string) */
	sub_acc_id: string; 
    /**Linked payment subaccount ID (Type: string) */
	linked_pmt_sub_acc_id: string; 
    /**Linked payment profile ID (Type: string) */
	linked_pmt_prf_id: string; 
    /**1: active | 0: inactive (Type: tinyint) */
	status: TPaymentProfileLinkHistStatus; 
    /**The user_id of the user who approved the linking (Type: string) */
	link_by: string; 
    /**The time of linking (Type: datetime) */
	link_time: any; 
    /**The login subaccount ID that approved the linking (Type: string) */
	link_login_acc_id: string; 
    /**The user_id of the user who performed the unlinking (Type: string) */
	unlink_by?: string; 
    /**The time of unlinking (Type: datetime) */
	unlink_time?: any; 
    /**The login subaccount ID that performed the unlinking (Type: string) */
	unlink_login_acc_id?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: datetime) */
	updated_time?: any; 
};


type TFields_v2_publisher = {
    /**Record Id (Type: string) */
	publisher_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	publisher_name: string; 
    /** (Type: string) */
	public_url?: string; 
    /** (Type: string) */
	public_url_parsed?: string; 
    /** (Type: string) */
	setting_parser?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_publisher_setting = {
    /**Record Id (Type: string) */
	publisher_setting_id: string; 
    /** (Type: string) */
	publisher_id?: string; 
    /** (Type: string) */
	network_id?: string; 
    /** (Type: string) */
	hierarchy?: string; 
    /** (Type: boolean) */
	is_dynamic?: boolean; 
    /** (Type: string) */
	code: string; 
    /** (Type: string) */
	prebid_setting?: string; 
    /** (Type: boolean) */
	hb_report?: boolean; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_recharge_queue = {
    /**the PK. Just composed by `${table_id}_${sub_acc_id}` (Type: string) */
	rq_sub_acc_id: string; 
    /** (Type: string) */
	pmt_sub_acc_id: string; 
    /** (Type: string) */
	pmt_prf_id: string; 
    /**The payment method used in the most recent failed charge attempt. (Type: string) */
	pmt_method_id?: string; 
    /**processing | pending | failed (Type: string) */
	status: TRechargeQueueStatus; 
    /** (Type: bigint) */
	amount: number; 
    /** (Type: bigint) */
	last_notified_balance: number; 
    /**GJW Order Id (Type: string) */
	order_id?: string; 
    /** (Type: string) */
	last_payment_err?: string; 
    /** (Type: datetime) */
	last_recharge_time?: any; 
    /**Tells how many times the charge has failed.If value=1, it has failed once. But you don't see a value=0, because when it succeeds, the failure rows about the payment method will be deleted.  (Type: smallint) */
	retry_count: number; 
    /** (Type: datetime) */
	next_retry_time?: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: datetime) */
	updated_time?: any; 
};


type TFields_v2_size_template = {
    /**Record Id (Type: string) */
	sizetp_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	sizetp_name: string; 
    /** (Type: string) */
	sizetp_desc?: string; 
    /** (Type: smallint) */
	width_px: number; 
    /** (Type: smallint) */
	height_px?: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_static_file = {
    /**Record Id (Type: string) */
	file_id: string; 
    /** (Type: string) */
	publisher_id: string; 
    /** (Type: string) */
	file_name?: string; 
    /** (Type: string) */
	file_desc?: string; 
    /** (Type: string) */
	public_url?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_sub_account = {
    /**Record Id (Type: string) */
	sub_acc_id: string; 
    /**10 digit, like a phone number (Type: bigint) */
	account_id?: number; 
    /**Required, visually identifies the record. (Type: string) */
	ads_sub_acc_name: string; 
    /** (Type: string) */
	ads_sub_acc_business_name?: string; 
    /** (Type: string) */
	advertiser_icon_url?: string; 
    /** (Type: string) */
	advertiser_time_zone_utcoffset?: string; 
    /** (Type: string) */
	advertiser_time_zone_abbrev?: string; 
    /** (Type: string) */
	advertiser_time_zone_name?: string; 
    /** (Type: boolean) */
	advertiser_time_zone_is_dst?: boolean; 
    /** (Type: float) */
	act_available_balance?: number; 
    /** (Type: float) */
	credit_line?: number; 
    /** (Type: string) */
	currency_code_iso4217?: string; 
    /** (Type: float) */
	receivables_accumulated?: number; 
    /**Ad account payment status (Type: string) */
	payment_status?: TAccountPaymentStatus; 
    /**ID of the linked payment profile (Type: string) */
	linked_pmt_prf_id?: string; 
    /**Account ID of the linked payment account (Type: string) */
	linked_pmt_sub_acc_id?: string; 
    /**The timestamp when the linking was triggered. Used to discard any earlier events mistakenly re-triggered. Different from the effective time `linked_pmt_prf_eff_time` (Type: datetime) */
	linked_pmt_prf_time?: any; 
    /**The time when the current payment profile linking goes into effect. May be the beginning of the next UTC day if the user just changed payment profiles. (Type: datetime) */
	linked_pmt_prf_eff_time?: any; 
    /** (Type: smallint) */
	max_payment_profiles?: number; 
    /** (Type: boolean) */
	autopay?: boolean; 
    /**unit = cent, not dollar! Max = 10,000 dollar (Type: integer) */
	recharge_threshold?: number; 
    /**unit = cent, not dollar! Max = 10,000 dollars (Type: integer) */
	recharge_amount?: number; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: string) */
	term_id?: string; 
    /** (Type: boolean) */
	is_term_accepted?: boolean; 
    /** (Type: string) */
	country_iso_code?: string; 
    /**If this account has a child account managed by it according to account_hierarchy table, then value is true. (Type: boolean) */
	is_mgr?: boolean; 
    /**This corresponds to the column name in account_hierarchy table. (Type: string) */
	lv0?: string; 
    /**lvl0 is the sub_acc_id of the top level node of the hierarchy tree that this account belongs to. (Type: string) */
	lv_at?: string; 
    /** (Type: datetime) */
	linked_time?: any; 
    /** (Type: string) */
	linked_by?: string; 
    /** (Type: integer) */
	max_direct_mgr_accounts?: number; 
    /** (Type: integer) */
	max_descendent_accounts?: number; 
    /** (Type: string) */
	msg_update?: string; 
    /**Notification indicator: if there is a pending payment profile link request, value=1; if not, value=0
- The aim of this variable is for saving the FE from having to call api all the time to see if there is any pending linkedPP.
- BE should turn it to 1 when any linkedPP Request is populated; while
- FE should turn it to 0 if it finds there is no active (non-expired) pending linked PP. (Type: smallint) */
	notif_pmt_prf_link: number; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: string) */
	acc_status?: string; 
    /** (Type: string) */
	acc_review_status?: TAccReviewStatus; 
    /** (Type: boolean) */
	is_enabled: boolean; 
    /** (Type: boolean) */
	is_internal?: boolean; 
};


type TFields_v2_sub_account_goal_metrics = {
    /** (Type: bigIncrements) */
	id?: number; 
    /**The sub_account under which this goal metrics is set for (Type: string) */
	sub_acc_id: string; 
    /**The GUI cpgn type for which the goal metrics is set (Type: string) */
	gui_cpgn_type: string; 
    /**In format of YYYY-MM. e.g. 2024-06 (Type: string) */
	year_month: string; 
    /**The ideal number of impression to reach  (Type: bigint) */
	imp_goal?: number; 
    /** (Type: string) */
	language?: string; 
    /** (Type: string) */
	country?: string; 
    /** (Type: string) */
	state?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
};


type TFields_v2_sub_group = {
    /**Record Id (Type: string) */
	sgrp_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	sgrp_name?: string; 
    /** (Type: string) */
	grp_id: string; 
    /** (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: bigint) */
	tgt_day_sgrp_imp?: number; 
    /** (Type: string) */
	adsformat_id: string; 
    /** (Type: string) */
	ads_type: string; 
    /** (Type: string) */
	sizetp_id: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_tags = {
    /**Record Id (Type: string) */
	id: string; 
    /** (Type: string) */
	lineage: string; 
    /** (Type: string) */
	tag_id: string; 
    /** (Type: string) */
	tag_name: string; 
    /** (Type: string) */
	display_name?: string; 
    /** (Type: string) */
	parent?: string; 
    /** (Type: timestamp) */
	last_user_update_time?: any; 
};


type TFields_v2_term = {
    /**Record Id (Type: string) */
	term_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	term_name: string; 
    /** (Type: string) */
	term_version: string; 
    /** (Type: json) */
	term_content: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_time_intervals = {
    /**Record Id (Type: string) */
	grp_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	cpgn_id: string; 
    /** (Type: string) */
	sub_acc_id: string; 
    /** (Type: smallint) */
	day_of_week: number; 
    /** (Type: string) */
	tgt_start_time: string; 
    /** (Type: string) */
	tgt_end_time: string; 
    /** (Type: datetime) */
	next_tgt_start_time?: any; 
    /** (Type: datetime) */
	next_tgt_end_time?: any; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_user_account = {
    /**Record Id (Type: string) */
	owner_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	main_acc_id?: string; 
    /** (Type: string) */
	main_acc_type?: string; 
    /** (Type: string) */
	sub_acc_id?: string; 
    /** (Type: string) */
	third_party_acc_id?: string; 
    /** (Type: string) */
	third_party_authorizer_endpoint?: string; 
    /** (Type: string) */
	third_party_authorizer_id?: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /**Owner of the user id (Type: string) */
	created_by?: string; 
    /** (Type: boolean) */
	is_verified?: boolean; 
    /** (Type: boolean) */
	is_published?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_video = {
    /**Record Id (Type: string) */
	vid_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	vid_src_url?: string; 
    /** (Type: string) */
	vid_page_url?: string; 
    /** (Type: string) */
	vid_preview_img_url?: string; 
    /** (Type: string) */
	vid_billing_method?: string; 
    /** (Type: integer) */
	vid_duration_sec?: number; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: datetime) */
	deleted_at?: any; 
};


type TFields_v2_zone = {
    /**Record Id (Type: string) */
	zone_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	zone_name: string; 
    /** (Type: string) */
	zone_desc?: string; 
    /** (Type: smallint) */
	zone_priority?: number; 
    /** (Type: string) */
	duration_range?: string; 
    /** (Type: string) */
	shape?: string; 
    /** (Type: string) */
	timing_type?: string; 
    /** (Type: string) */
	placement_loc_type?: string; 
    /** (Type: boolean) */
	is_template?: boolean; 
    /** (Type: boolean) */
	is_premium?: boolean; 
    /** (Type: string) */
	publisher_id: string; 
    /** (Type: string) */
	zone_ads_type: string; 
    /** (Type: datetime) */
	created_time: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_zone_adsformat = {
    /**Record Id (Type: string) */
	zone_adsformat_id: string; 
    /**Required, visually identifies the record. (Type: string) */
	zone_id: string; 
    /** (Type: string) */
	adsformat_id: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_zone_adstype_sizetp = {
    /**Record Id (Type: string) */
	zone_adstype_sizetp_id: string; 
    /** (Type: string) */
	zone_id: string; 
    /** (Type: string) */
	ads_type: string; 
    /** (Type: string) */
	sizetp_id: string; 
    /** (Type: datetime) */
	created_time?: any; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: boolean) */
	is_del?: boolean; 
};


type TFields_v2_zone_policy = {
    /** (Type: string) */
	policy_id: string; 
    /** (Type: string) */
	policy_name?: string; 
    /** (Type: string) */
	zone_id: string; 
    /** (Type: string) */
	policy_key: string; 
    /** (Type: string) */
	policy_value: string; 
    /** (Type: boolean) */
	is_global?: boolean; 
    /** (Type: boolean) */
	is_del?: boolean; 
    /** (Type: datetime) */
	last_user_update_time?: any; 
    /** (Type: string) */
	last_user_update_by?: string; 
    /** (Type: string) */
	created_by?: string; 
    /** (Type: datetime) */
	created_time?: any; 
};


//------- The definition below will be merged  -------------

//For TTableName
interface _ISysTableName{
	"account_hierarchy": 1
	"account_identifiers": 1
	"ads_categories": 1
	"ads_channels": 1
	"ClickHouse": 1
	"geoip2_location_en": 1
	"hb_info": 1
	"latest_hourly_balance": 1
	"location_county": 1
	"payment_error": 1
	"rv_reject_reasons": 1
	"rv_review_jobs": 1
	"rv_review_results_manual": 1
	"rv_reviewers": 1
	"v2_adsformat": 1
	"v2_adstype_sizetp": 1
	"v2_applied_payments": 1
	"v2_balance_adjustments": 1
	"v2_balance_adjustments_manual": 1
	"v2_banner": 1
	"v2_campaigns": 1
	"v2_companion": 1
	"v2_config": 1
	"v2_creative_assets": 1
	"v2_creative_statistics_hourly": 1
	"v2_creatives": 1
	"v2_daily_account_balance": 1
	"v2_daily_ad_spend": 1
	"v2_fp_ratio_language": 1
	"v2_fp_ratio_location": 1
	"v2_groups": 1
	"v2_gui_cpgn_type_mapping": 1
	"v2_language": 1
	"v2_main_account": 1
	"v2_monthly_account_balance": 1
	"v2_monthly_campaign_spend": 1
	"v2_multi_video_rule": 1
	"v2_payment_locks": 1
	"v2_payment_methods": 1
	"v2_payment_profiles": 1
	"v2_payments": 1
	"v2_payments_manual": 1
	"v2_pmt_prf_links": 1
	"v2_pmt_prf_links_history": 1
	"v2_publisher": 1
	"v2_publisher_setting": 1
	"v2_recharge_queue": 1
	"v2_size_template": 1
	"v2_static_file": 1
	"v2_sub_account": 1
	"v2_sub_account_goal_metrics": 1
	"v2_sub_group": 1
	"v2_tags": 1
	"v2_term": 1
	"v2_time_intervals": 1
	"v2_user_account": 1
	"v2_video": 1
	"v2_zone": 1
	"v2_zone_adsformat": 1
	"v2_zone_adstype_sizetp": 1
	"v2_zone_policy": 1
}

//For TTableId
interface _ISysTableId{
	"account_hierarchy": "ah"
	"account_identifiers": "ai"
	"ads_categories": "13"
	"ads_channels": "14"
	"ClickHouse": "ch"
	"geoip2_location_en": "12"
	"hb_info": "hi"
	"latest_hourly_balance": "lh"
	"location_county": "lc"
	"payment_error": "pe"
	"rv_reject_reasons": "rr"
	"rv_review_jobs": "rj"
	"rv_review_results_manual": "rm"
	"rv_reviewers": "rp"
	"v2_adsformat": "f"
	"v2_adstype_sizetp": "as"
	"v2_applied_payments": "ap"
	"v2_balance_adjustments": "ba"
	"v2_balance_adjustments_manual": "mba"
	"v2_banner": "N"
	"v2_campaigns": "m"
	"v2_companion": "O"
	"v2_config": "15"
	"v2_creative_assets": "ca"
	"v2_creative_statistics_hourly": "10"
	"v2_creatives": "c"
	"v2_daily_account_balance": "da"
	"v2_daily_ad_spend": "ds"
	"v2_fp_ratio_language": "fpn"
	"v2_fp_ratio_location": "fpl"
	"v2_groups": "g"
	"v2_gui_cpgn_type_mapping": "gc"
	"v2_language": "la"
	"v2_main_account": "B"
	"v2_monthly_account_balance": "vmab"
	"v2_monthly_campaign_spend": "vmcs"
	"v2_multi_video_rule": "mv"
	"v2_payment_locks": "plk"
	"v2_payment_methods": "pm"
	"v2_payment_profiles": "pp"
	"v2_payments": "p"
	"v2_payments_manual": "mp"
	"v2_pmt_prf_links": "pl"
	"v2_pmt_prf_links_history": "plh"
	"v2_publisher": "R"
	"v2_publisher_setting": "I"
	"v2_recharge_queue": "rq"
	"v2_size_template": "S"
	"v2_static_file": "J"
	"v2_sub_account": "b"
	"v2_sub_account_goal_metrics": "bg"
	"v2_sub_group": "s"
	"v2_tags": "TG"
	"v2_term": "T"
	"v2_time_intervals": "l"
	"v2_user_account": "a"
	"v2_video": "v"
	"v2_zone": "z"
	"v2_zone_adsformat": "F"
	"v2_zone_adstype_sizetp": "zas"
	"v2_zone_policy": "zp"
}


//For TActionName
interface _ISysActionName{
	"get": 1
	"put": 1
	"post": 1
	"delete": 1
	"get-by-operator": 1
	"get-all": 1
	"get-report-data": 1
	"get-countries": 1
	"get-states": 1
	"load-prebid-video-data": 1
	"get-dropdown-list": 1
	"get-one-by-reviewer": 1
	"get-by-reviewer": 1
	"get-related-ldpgs": 1
	"put-by-reviewer": 1
	"put-claim-job_by-reviewer": 1
	"put-unclaim-job_by-reviewer": 1
	"put-submit-review_by-reviewer": 1
	"post-by-reviewer": 1
	"put-by-operator": 1
	"post-by-operator": 1
	"delete-by-operator": 1
	"get-by-accounting": 1
	"post-by-accounting": 1
	"put-draft": 1
	"post-draft": 1
	"get-all-ids": 1
	"get-full-campaign": 1
	"get-dropdown-list-report": 1
	"put-campaign-status": 1
	"get-by-id": 1
	"get-names-by-operator": 1
	"get-full-assets": 1
	"put-asset-status": 1
	"put-by-cms-grid": 1
	"put-refresh-video": 1
	"post-by-duplication": 1
	"get-full-creative": 1
	"put-crtv-status": 1
	"get-by-senior_operator": 1
	"put-by-senior_operator": 1
	"post-by-senior_operator": 1
	"get-full-group": 1
	"put-group-status": 1
	"put-group-tgt_day_grp_imp": 1
	"get-ads-types-by-cpgn": 1
	"get-gui-cpgn-types": 1
	"get-ads-types": 1
	"get-published": 1
	"get-my_own-main-accounts": 1
	"post-by-user": 1
	"get-by-billing_admin": 1
	"put-by-billing_admin": 1
	"delete-by-billing_admin": 1
	"post-by-billing_admin": 1
	"get-invoices-by-billing_admin": 1
	"search-by-account-name": 1
	"get-my-direct_mcc_accounts": 1
	"get--deprecated-do-not-use": 1
	"get-by-payment_profile--do-not-use": 1
	"put-by-system": 1
	"delete-by-senior_operator": 1
	"get-by-thirdparty": 1
	"put-update-vid": 1
}

//For TFieldName
interface _IAppFieldName {
	"lv0": 1
	"lv1": 1
	"lv2": 1
	"lv3": 1
	"lv4": 1
	"lv5": 1
	"lv6": 1
	"status": 1
	"created_time": 1
	"created_by": 1
	"last_user_update_time": 1
	"last_user_update_by": 1
	"sub_acc_id": 1
	"account_id": 1
	"cat_id": 1
	"cat_description": 1
	"chl_id": 1
	"chl_description": 1
	"id": 1
	"rec_name": 1
	"user_id": 1
	"timestamp": 1
	"cpgn_id": 1
	"grp_id": 1
	"crtv_id": 1
	"continent_code": 1
	"continent_name": 1
	"country_iso_code": 1
	"country_name": 1
	"subdivision_1_iso_code": 1
	"subdivision_1_name": 1
	"city_name": 1
	"county_name": 1
	"req_id": 1
	"event_time": 1
	"send_time": 1
	"event_name": 1
	"extra_data": 1
	"ad_unit_code": 1
	"allow_prebid": 1
	"is_cmp_loaded": 1
	"is_js_loaded": 1
	"retry": 1
	"bidder": 1
	"error_msg": 1
	"cpm": 1
	"time_to_respond": 1
	"reject_reason": 1
	"region": 1
	"auction_id": 1
	"balance": 1
	"last_paid_time": 1
	"last_cost_time": 1
	"country_alpha2_code": 1
	"region_code": 1
	"type": 1
	"payload": 1
	"filter_key": 1
	"filter_value": 1
	"reject_reason_id": 1
	"reject_reason_desc": 1
	"reject_template": 1
	"review_type": 1
	"review_job_id": 1
	"resource_json": 1
	"queue": 1
	"last_reviewer_id": 1
	"last_claimed_by": 1
	"enqueued_at": 1
	"priority": 1
	"assigned_at": 1
	"expire_at": 1
	"started_at": 1
	"decided_at": 1
	"result": 1
	"enqueue_status": 1
	"result_detail": 1
	"result_id": 1
	"is_applied": 1
	"ver": 1
	"reviewer_id": 1
	"handling_time_ms": 1
	"reviewer_name": 1
	"reviewer_level": 1
	"adsformat_id": 1
	"adsformat_name": 1
	"adsformat_desc": 1
	"is_del": 1
	"adstype_sizetp_id": 1
	"ads_type": 1
	"sizetp_id": 1
	"applied_pmt_id": 1
	"ad_spend_id": 1
	"payment_id": 1
	"bal_adj_id": 1
	"applied_amount": 1
	"ending_balance": 1
	"applied_time": 1
	"updated_time": 1
	"updated_by": 1
	"adj_amount": 1
	"adj_time": 1
	"unapplied_amount": 1
	"notes": 1
	"created_time_utc": 1
	"manual_adj_id": 1
	"banner_id": 1
	"disp_img_url": 1
	"disp_text_below_image": 1
	"deleted_at": 1
	"cpgn_name": 1
	"cpgn_type": 1
	"gui_cpgn_type": 1
	"cpgn_subtype": 1
	"cpgn_status": 1
	"bid_strategy": 1
	"max_bidding_price": 1
	"cpgn_budget_duration_type": 1
	"cpgn_budget_min": 1
	"line_item_type": 1
	"tgt_day_cpgn_budget_value": 1
	"cpgn_pacing_type": 1
	"freq_cap_level": 1
	"freq_cap_cycle": 1
	"freq_cap_value": 1
	"start_date": 1
	"end_date": 1
	"is_end_date_set": 1
	"tgt_tot_cpgn_imp": 1
	"tgt_day_cpgn_imp": 1
	"tgt_delivery_languages": 1
	"tgt_delivery_locations": 1
	"tgt_delivery_locations_ui": 1
	"not_include_languages": 1
	"not_include_locations": 1
	"not_include_locations_ui": 1
	"is_tgt_delivery_locations_all": 1
	"tgt_delivery_stags": 1
	"vid_skippable": 1
	"cpgn_utm": 1
	"is_verified": 1
	"is_published": 1
	"is_enabled": 1
	"companion_id": 1
	"comment": 1
	"env_key": 1
	"env_value": 1
	"crtv_asset_id": 1
	"crtv_asset_name": 1
	"crtv_asset_status": 1
	"keywords": 1
	"crtv_slogan": 1
	"crtv_slogan_detail": 1
	"crtv_icon_url": 1
	"crtv_icon_hash": 1
	"crtv_icon_name": 1
	"crtv_button_text": 1
	"crtv_width": 1
	"crtv_height": 1
	"disp_img_hash": 1
	"vid_content_id": 1
	"vid_src_url": 1
	"vid_page_url": 1
	"vid_preview_img_url": 1
	"vid_duration_sec": 1
	"crtv_asset_hash": 1
	"asset_review_status": 1
	"asset_rejected_reason_id": 1
	"aggr_hr": 1
	"act_hr_crtv_clicks": 1
	"act_hr_crtv_delivery": 1
	"tgt_hr_crtv_imp": 1
	"act_hr_crtv_imp": 1
	"act_hr_crtv_views": 1
	"crtv_name": 1
	"sgrp_id": 1
	"crtv_carrier_type": 1
	"crtv_status": 1
	"crtv_description": 1
	"landing_page": 1
	"note": 1
	"landing_page_target": 1
	"crtv_alt_text": 1
	"crtv_status_text": 1
	"is_companion_master": 1
	"crtv_utm": 1
	"vid_billing_method": 1
	"ldpg_hash": 1
	"ldpg_review_status": 1
	"ldpg_reviewed_at": 1
	"alr_review_status": 1
	"crtv_review_status": 1
	"alr_rejected_reason_id": 1
	"ldpg_rejected_reason_id": 1
	"prev_alr": 1
	"acc_bal_id": 1
	"daily_paid_amount": 1
	"daily_payment_unapplied": 1
	"daily_spend_amount": 1
	"daily_applied_spend": 1
	"daily_spend_balance": 1
	"daily_adj_amount": 1
	"daily_adj_unapplied": 1
	"before_payment_unapplied": 1
	"after_payment_unapplied": 1
	"before_total_spend_balance": 1
	"after_total_spend_balance": 1
	"before_adj_unapplied": 1
	"after_adj_unapplied": 1
	"applied_previous_spend": 1
	"date": 1
	"eff_date": 1
	"is_most_recent": 1
	"amount": 1
	"paymentstatus": 1
	"language": 1
	"ratio": 1
	"country": 1
	"state": 1
	"time_zone_name": 1
	"grp_name": 1
	"grp_type": 1
	"grp_status": 1
	"tgt_device_types": 1
	"tgt_delivery_categories": 1
	"tgt_delivery_channels": 1
	"tgt_delivery_tags": 1
	"tgt_delivery_hashtags": 1
	"tgt_policy_ids": 1
	"is_tgt_channels": 1
	"not_include_categories": 1
	"not_include_channels": 1
	"not_include_tags": 1
	"is_full_duration": 1
	"is_day_grp_budget_limits_on": 1
	"day_grp_max_budget": 1
	"tgt_day_grp_budget_value": 1
	"tgt_day_grp_imp": 1
	"grp_freq_cap_cycle": 1
	"grp_freq_cap_value": 1
	"grp_utm": 1
	"schedule_segments": 1
	"zone_ads_type": 1
	"lang_name": 1
	"lang_descr": 1
	"lang_no": 1
	"main_acc_id": 1
	"main_acc_name": 1
	"main_acc_business_name": 1
	"currency_code_iso4217": 1
	"advertiser_time_zone_name": 1
	"period": 1
	"pmt_prf_id": 1
	"pmt_sub_acc_id": 1
	"prf_start_date": 1
	"prf_end_date": 1
	"active": 1
	"opening_balance_from_payments": 1
	"opening_balance_adj": 1
	"opening_spend_balance": 1
	"closing_balance_from_payments": 1
	"closing_balance_from_adj": 1
	"closing_spend_balance": 1
	"total_payments_received": 1
	"total_adjustment_amount": 1
	"total_ad_spend": 1
	"tax": 1
	"statement_uri": 1
	"month": 1
	"cost": 1
	"adjustment": 1
	"adj_ids": 1
	"adj_months": 1
	"imp": 1
	"click": 1
	"created_at": 1
	"updated_at": 1
	"multi_video_rule_id": 1
	"publisher_id": 1
	"location": 1
	"tag": 1
	"adspot": 1
	"lock_time": 1
	"pmt_method_id": 1
	"gtwy_acc_id": 1
	"gtwy_cus_id": 1
	"gtwy_pmt_method_id": 1
	"description": 1
	"billing_address": 1
	"pmt_prf_name": 1
	"legal_name": 1
	"org_name": 1
	"email": 1
	"phone": 1
	"phone_country_code": 1
	"address_postal_code": 1
	"address_country": 1
	"is_mgr": 1
	"paid_amount": 1
	"gtwy_fee": 1
	"total_amount": 1
	"refund": 1
	"invoice_uri": 1
	"gjw_user_id": 1
	"paid_time": 1
	"paid_time_utc": 1
	"manual_pmt_id": 1
	"processing_fee": 1
	"link_id": 1
	"linked_pmt_sub_acc_id": 1
	"linked_pmt_prf_id": 1
	"link_his_id": 1
	"link_by": 1
	"link_time": 1
	"link_login_acc_id": 1
	"unlink_by": 1
	"unlink_time": 1
	"unlink_login_acc_id": 1
	"publisher_name": 1
	"public_url": 1
	"public_url_parsed": 1
	"setting_parser": 1
	"publisher_setting_id": 1
	"network_id": 1
	"hierarchy": 1
	"is_dynamic": 1
	"code": 1
	"prebid_setting": 1
	"hb_report": 1
	"rq_sub_acc_id": 1
	"last_notified_balance": 1
	"order_id": 1
	"last_payment_err": 1
	"last_recharge_time": 1
	"retry_count": 1
	"next_retry_time": 1
	"sizetp_name": 1
	"sizetp_desc": 1
	"width_px": 1
	"height_px": 1
	"file_id": 1
	"file_name": 1
	"file_desc": 1
	"ads_sub_acc_name": 1
	"ads_sub_acc_business_name": 1
	"advertiser_icon_url": 1
	"advertiser_time_zone_utcoffset": 1
	"advertiser_time_zone_abbrev": 1
	"advertiser_time_zone_is_dst": 1
	"act_available_balance": 1
	"credit_line": 1
	"receivables_accumulated": 1
	"payment_status": 1
	"linked_pmt_prf_time": 1
	"linked_pmt_prf_eff_time": 1
	"max_payment_profiles": 1
	"autopay": 1
	"recharge_threshold": 1
	"recharge_amount": 1
	"term_id": 1
	"is_term_accepted": 1
	"lv_at": 1
	"linked_time": 1
	"linked_by": 1
	"max_direct_mgr_accounts": 1
	"max_descendent_accounts": 1
	"msg_update": 1
	"notif_pmt_prf_link": 1
	"acc_status": 1
	"acc_review_status": 1
	"is_internal": 1
	"year_month": 1
	"imp_goal": 1
	"sgrp_name": 1
	"tgt_day_sgrp_imp": 1
	"lineage": 1
	"tag_id": 1
	"tag_name": 1
	"display_name": 1
	"parent": 1
	"term_name": 1
	"term_version": 1
	"term_content": 1
	"day_of_week": 1
	"tgt_start_time": 1
	"tgt_end_time": 1
	"next_tgt_start_time": 1
	"next_tgt_end_time": 1
	"owner_id": 1
	"main_acc_type": 1
	"third_party_acc_id": 1
	"third_party_authorizer_endpoint": 1
	"third_party_authorizer_id": 1
	"vid_id": 1
	"zone_id": 1
	"zone_name": 1
	"zone_desc": 1
	"zone_priority": 1
	"duration_range": 1
	"shape": 1
	"timing_type": 1
	"placement_loc_type": 1
	"is_template": 1
	"is_premium": 1
	"zone_adsformat_id": 1
	"zone_adstype_sizetp_id": 1
	"policy_id": 1
	"policy_name": 1
	"policy_key": 1
	"policy_value": 1
	"is_global": 1
}

