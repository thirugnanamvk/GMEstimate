
Use hm_gm;

DELIMITER //
CREATE PROCEDURE SP_UpdateResourceCostHistory 
( IN UpdatedBy nvarchar(200)) 
BEGIN 

	-- Insert records into history table
   INSERT INTO tbl_ResourceCost_History 
	(
		Practice, 
		Skill,
		Competency,
		OnsiteCost,
		OffshoreCost,
		CreatedDate,
		CreatedBy,
		IsActive,
		ModifiedDate,
		ModifiedBy
	)
	SELECT 
		Practice,
        Skill,
        Competency,
        OnsiteCost,
        OffshoreCost,
        CreatedDate,
        CreatedBy,
        false,
        now(),
        UpdatedBy
		FROM tbl_ResourceCost;
		
		
	-- Truncate master table
	truncate table tbl_ResourceCost;

END;