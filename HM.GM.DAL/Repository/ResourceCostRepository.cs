using System;
using System.Collections.Generic;
using System.Text;
using HM.GM.DAL.Model;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace HM.GM.DAL.Repository
{
    public class ResourceCostRepository : IResourceCostRepository
    {
        private readonly IConfiguration _configuration;
        private MySqlConnection connection;

        public ResourceCostRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<ResourceCostDetail> GetResourceCostDetails()
        {
            throw new NotImplementedException();
        }

        public void InsertResourceCostDetails(List<ResourceCostDetail> practiceCostDetailList)
        {
            StringBuilder sCommand = new StringBuilder("INSERT INTO tbl_PracticeCost (Practice, Skill ,Competency, OnsiteCost, OffsiteCost, CreatedDate, CreatedBy, IsActive ) VALUES ");
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (MySqlConnection mConnection = new MySqlConnection(connectionString))
            {
                List<string> Rows = new List<string>();
                foreach (var practiceCostDetail in practiceCostDetailList)
                {
                    Rows.Add(string.Format("('{0}','{1}','{2}','{3}','{4}','{5}','{6}', {7})",
                                MySqlHelper.EscapeString(practiceCostDetail.Practice.ToUpper()),
                                MySqlHelper.EscapeString(practiceCostDetail.Skill.ToUpper()),
                                MySqlHelper.EscapeString(practiceCostDetail.Competency.ToUpper()),
                                practiceCostDetail.OnsiteCost,
                                practiceCostDetail.OffsiteCost,
                                String.Format("{0:s}", practiceCostDetail.CreatedDate),
                                MySqlHelper.EscapeString(practiceCostDetail.CreatedBy.ToUpper()),
                                practiceCostDetail.IsActive
                    ));
                }
                sCommand.Append(string.Join(",", Rows));
                sCommand.Append(";");
                mConnection.Open();
                using (MySqlCommand myCmd = new MySqlCommand(sCommand.ToString(), mConnection))
                {
                    myCmd.CommandType = CommandType.Text;
                    myCmd.ExecuteNonQuery();
                }
            }
        }
    }
}
