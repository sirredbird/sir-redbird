const saveCalculation = async () => {
  const { error } = await supabase
    .from("pricing_calculations")
    .insert([
      {
        facility_type: facilityType,
        hours: hours,
        visits_per_month: visits,
        service_tier: tier,
        monthly: monthly,
        profit: profit,
        margin: margin
      }
    ]);

  if (error) {
    alert("Error saving data");
    console.error(error);
  } else {
    alert("Saved successfully");
  }
};
