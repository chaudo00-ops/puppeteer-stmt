type TFields_v2_campaign_locations = Pick<
	TFields_v2_campaigns,
	| "tgt_delivery_locations_ui"
	| "not_include_locations_ui"
	| "tgt_delivery_locations"
	| "not_include_locations"
>;

type TFields_v2_groups_excl = Pick<
	TFields_v2_groups,
	"tgt_device_types" | "tgt_delivery_categories" | "not_include_categories" | "schedule_segments"
>;

type TFields_v2_groups_ui = Omit<TFields_v2_groups, keyof TFields_v2_groups_excl> & {
	tgt_device_types: TDeviceType[];
	tgt_delivery_categories: string[];
	not_include_categories: string[];
	schedule_segments: { value: TScheduleSegment[] };
} & {
	cpgn_type: string;
	cpgn_name: string;
	grp_cpm: number;
	act_tot_grp_clicks: number;
	act_tot_grp_ctr: number;
	act_tot_grp_cost: number;

	expiration_time: number;

	cpgn_status: string;
	is_cpgn_published?: TFields_v2_campaigns["is_published"];
	is_cpgn_del?: TFields_v2_campaigns["is_del"];
	// cpgn_review_status?: TFields_v2_campaigns['review_status']
};

type TFields_v2_time_intervals_ui = TFields_v2_time_intervals & {
	is_full_duration: boolean;
	schedule_segments: TScheduleSegment[];
};

type TFields_v2_monthly_account_balance_ui = TFields_v2_monthly_account_balance & {
	opening_balance: number;
	closing_balance: number;
	total_ad_spend_adjusted: number;
	actions: string;
};

type TFields_v2_monthly_campaign_spend_ui = TFields_v2_monthly_campaign_spend &
	Pick<TFields_v2_campaigns, "cpgn_name">;

type TFields_v2_payments_ui = TFields_v2_payments &
	Pick<TFields_v2_sub_account, "ads_sub_acc_name"> &
	Pick<TFields_v2_payment_profiles, "pmt_prf_name">;
