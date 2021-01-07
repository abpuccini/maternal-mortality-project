-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "mmr_global" (
    "name" string   NOT NULL,
    "mmr" INT   NOT NULL,
    "category" string   NOT NULL,
    "latitude" INT   NOT NULL,
    "longitude" INT   NOT NULL,
    CONSTRAINT "pk_mmr_global" PRIMARY KEY (
        "name"
     )
);

CREATE TABLE "mmr_us" (
    "id" INT   NOT NULL,
    "state" string   NOT NULL,
    "state_code" INT   NOT NULL,
    "year" INT   NOT NULL,
    "deaths" INT   NOT NULL,
    "births" INT   NOT NULL,
    "maternal_mortality_ratio" FLOAT   NOT NULL,
    "population" INT   NOT NULL,
    CONSTRAINT "pk_mmr_us" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "ins_us" (
    "id" INT   NOT NULL,
    "location" string   NOT NULL,
    "year" INT   NOT NULL,
    "employer" FLOAT   NOT NULL,
    "non-group" FLOAT   NOT NULL,
    "medicaid" FLOAT   NOT NULL,
    "medicare" FLOAT   NOT NULL,
    "military" FLOAT   NOT NULL,
    "uninsured" FLOAT   NOT NULL,
    "total" INT   NOT NULL,
    CONSTRAINT "pk_ins_us" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "state_health_rankings" (
    "year" INT   NOT NULL,
    "measure_name" string   NOT NULL,
    "state" string   NOT NULL,
    "rank" INT   NOT NULL,
    "value" FLOAT   NOT NULL
);

CREATE TABLE "hwc_key" (
    "measure_name" string   NOT NULL,
    "abbreviation" string   NOT NULL,
    "demographic_breakdown" BOOLEAN   NOT NULL,
    "source" string   NOT NULL,
    "source_year" string   NOT NULL,
    CONSTRAINT "pk_hwc_key" PRIMARY KEY (
        "measure_name"
     )
);

CREATE TABLE "hwc_data" (
    "state_name" string   NOT NULL,
    "ahi_rank" FLOAT   NOT NULL,
    "ahi_value" FLOAT   NOT NULL,
    "ahi_score" FLOAT   NOT NULL,
    "ahi_lower_ci" FLOAT   NOT NULL,
    "ahi_upper_ci" FLOAT   NOT NULL,
    "ai_rank" FLOAT   NOT NULL,
    "ai_value" FLOAT   NOT NULL,
    "ai_score" FLOAT   NOT NULL,
    "ai_lower_ci" FLOAT   NOT NULL,
    "ai_upper_ci" FLOAT   NOT NULL,
    "apc_rank" FLOAT   NOT NULL,
    "apc_value" FLOAT   NOT NULL,
    "apc_score" FLOAT   NOT NULL,
    "apc_lower_ci" FLOAT   NOT NULL,
    "apc_upper_ci" FLOAT   NOT NULL,
    "ac_rank" FLOAT   NOT NULL,
    "ac_value" FLOAT   NOT NULL,
    "ac_score" FLOAT   NOT NULL,
    "ac_lower_ci" FLOAT   NOT NULL,
    "ac_upper_ci" FLOAT   NOT NULL,
    "dhcp_rank" FLOAT   NOT NULL,
    "dhcp_value" FLOAT   NOT NULL,
    "dhcp_score" FLOAT   NOT NULL,
    "dhcp_lower_ci" FLOAT   NOT NULL,
    "dhcp_upper_ci" FLOAT   NOT NULL,
    "ds_rank" FLOAT   NOT NULL,
    "ds_value" FLOAT   NOT NULL,
    "ds_score" FLOAT   NOT NULL,
    "ds_lower_ci" FLOAT   NOT NULL,
    "ds_upper_ci" FLOAT   NOT NULL,
    "mpinc_rank" FLOAT   NOT NULL,
    "mpinc_value" FLOAT   NOT NULL,
    "mpinc_score" FLOAT   NOT NULL,
    "mpinc_lower_ci" FLOAT   NOT NULL,
    "mpinc_upper_ci" FLOAT   NOT NULL,
    "mow_rank" FLOAT   NOT NULL,
    "mow_value" FLOAT   NOT NULL,
    "mow_score" FLOAT   NOT NULL,
    "mow_lower_ci" FLOAT   NOT NULL,
    "mow_upper_ci" FLOAT   NOT NULL,
    "pw_rank" FLOAT   NOT NULL,
    "pw_value" FLOAT   NOT NULL,
    "pw_score" FLOAT   NOT NULL,
    "pw_lower_ci" FLOAT   NOT NULL,
    "pw_upper_ci" FLOAT   NOT NULL,
    "ow_rank" FLOAT   NOT NULL,
    "ow_value" FLOAT   NOT NULL,
    "ow_score" FLOAT   NOT NULL,
    "ow_lower_ci" FLOAT   NOT NULL,
    "ow_upper_ci" FLOAT   NOT NULL,
    "ppv_rank" FLOAT   NOT NULL,
    "ppv_value" FLOAT   NOT NULL,
    "ppv_score" FLOAT   NOT NULL,
    "ppv_lower_ci" FLOAT   NOT NULL,
    "ppv_upper_ci" FLOAT   NOT NULL,
    "pctt_rank" FLOAT   NOT NULL,
    "pctt_value" FLOAT   NOT NULL,
    "pctt_score" FLOAT   NOT NULL,
    "pctt_lower_ci" FLOAT   NOT NULL,
    "pctt_upper_ci" FLOAT   NOT NULL,
    "pfhs_rank" FLOAT   NOT NULL,
    "pfhs_value" FLOAT   NOT NULL,
    "pfhs_score" FLOAT   NOT NULL,
    "pfhs_lower_ci" FLOAT   NOT NULL,
    "pfhs_upper_ci" FLOAT   NOT NULL,
    "rpa_rank" FLOAT   NOT NULL,
    "rpa_value" FLOAT   NOT NULL,
    "rpa_score" FLOAT   NOT NULL,
    "rpa_lower_ci" FLOAT   NOT NULL,
    "rpa_upper_ci" FLOAT   NOT NULL,
    "uw_rank" FLOAT   NOT NULL,
    "uw_value" FLOAT   NOT NULL,
    "uw_score" FLOAT   NOT NULL,
    "uw_lower_ci" FLOAT   NOT NULL,
    "uw_upper_ci" FLOAT   NOT NULL,
    "wwv_rank" FLOAT   NOT NULL,
    "wwv_value" FLOAT   NOT NULL,
    "wwv_score" FLOAT   NOT NULL,
    "wwv_lower_ci" FLOAT   NOT NULL,
    "wwv_upper_ci" FLOAT   NOT NULL,
    "wic_rank" FLOAT   NOT NULL,
    "wic_value" FLOAT   NOT NULL,
    "wic_score" FLOAT   NOT NULL,
    "wic_lower_ci" FLOAT   NOT NULL,
    "wic_upper_ci" FLOAT   NOT NULL,
    CONSTRAINT "pk_hwc_data" PRIMARY KEY (
        "state_name"
     )
);

ALTER TABLE "mmr_us" ADD CONSTRAINT "fk_mmr_us_state_year" FOREIGN KEY("state", "year")
REFERENCES "ins_us" ("location", "year");

ALTER TABLE "ins_us" ADD CONSTRAINT "fk_ins_us_location" FOREIGN KEY("location")
REFERENCES "state_health_rankings" ("state");

ALTER TABLE "state_health_rankings" ADD CONSTRAINT "fk_state_health_rankings_year" FOREIGN KEY("year")
REFERENCES "ins_us" ("year");

ALTER TABLE "state_health_rankings" ADD CONSTRAINT "fk_state_health_rankings_state" FOREIGN KEY("state")
REFERENCES "mmr_us" ("state");

ALTER TABLE "hwc_data" ADD CONSTRAINT "fk_hwc_data_state_name" FOREIGN KEY("state_name")
REFERENCES "mmr_us" ("state");

