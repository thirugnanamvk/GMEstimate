
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace HM.GM.BAL.Model
{
    public class SaveResourceCostDetail
    {
        public List<ResourceCostDetail> UpdateResourceCostDetail { get; set; }
        public List<ResourceCostDetail> InsertResourceCostDetail { get; set; }
        public List<ResourceCostDetail> DeleteResourceCostDetail { get; set; }
    


    }
}
