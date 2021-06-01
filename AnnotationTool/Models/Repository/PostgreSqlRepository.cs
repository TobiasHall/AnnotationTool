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
        private readonly string connString = "Server=localhost; Port=5433; Database=udt; User Id =postgres; Password=296582; Trust Server Certificate=true;";        
        
        public List<UdtInterfaceModel> GetInterfaces()
        {
            try
            {
                string stmt = "SELECT * FROM interface ORDER BY id ASC";
                using (var conn = new NpgsqlConnection(connString))
                {
                    UdtInterfaceModel udt = null;
                    List<UdtInterfaceModel> udts = new List<UdtInterfaceModel>();
                    conn.Open();

                    using (var command = new NpgsqlCommand(stmt, conn))
                    {
                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                udt = new UdtInterfaceModel
                                {
                                    Id = (int)reader["id"],
                                    Type = (string)reader["type"],
                                    Name = (string)reader["name"]
                                };
                                udts.Add(udt);
                            }
                        }
                    }
                    return udts;
                }
            }
            catch (PostgresException)
            {
                throw;
            }
            



        }
    }
}
