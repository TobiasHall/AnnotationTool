using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using System.Data;
using AnnotationTool.Models;
using Microsoft.Extensions.Configuration;

namespace AnnotationTool.Repository
{
    public class PostgreSqlRepository
    {
        private string connString = "Server = localhost; Port=5433; Database=udt; User Id = postgres; Password=296582; Trust Server Certificate=true;";
        public PostgreSqlRepository()
        {
            
        }
        
        public List<UdtInterfaceModel> GetInterfaces()
        {
            List<UdtInterfaceModel> displayUdtInterface = new List<UdtInterfaceModel>();
            using (NpgsqlConnection conn = new NpgsqlConnection(connString))
            {
                conn.Open();
                NpgsqlCommand comm = new NpgsqlCommand();
                comm.Connection = conn;
                comm.CommandType = CommandType.Text;
                comm.CommandText = "SELECT * FROM interface ORDER BY id ASC";

                NpgsqlDataReader sdr = comm.ExecuteReader();
                while (sdr.Read())
                {
                    var interfaceList = new UdtInterfaceModel();
                    interfaceList.Id = Convert.ToInt32(sdr["id"]);
                    interfaceList.Type = Convert.ToString(sdr["type"]);
                    interfaceList.Name = Convert.ToString(sdr["name"]);
                    displayUdtInterface.Add(interfaceList);
                }

                return displayUdtInterface;
            }
            
        }
    }
}
