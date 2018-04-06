using System.Collections.Generic;

namespace HM.GM.BAL.Model
{
    public class ResourceCostDetailList
    {
        public List<ResourceCostDetail> UpdateCostDetailList { get; set; }
        public List<ResourceCostDetail> InsertCostDetailList { get; set; }
        public List<ResourceCostDetail> DeleteCostDetailList { get; set; }
    }
}
