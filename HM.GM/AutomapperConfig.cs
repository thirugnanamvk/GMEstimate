using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BALModel = HM.GM.BAL.Model;
using DALModel = HM.GM.DAL.Model;
using AutoMapper;

namespace HM.GM
{
    public class AutomapperConfig
    {
        public static void CreateMapping()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<BALModel.ResourceCostDetail, DALModel.ResourceCostDetail>();
                cfg.CreateMap<BALModel.GMDefaults, DALModel.GMDefaults>();
            });
        }
    }
}
