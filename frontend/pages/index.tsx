import type { InferGetStaticPropsType } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { useState } from 'react';
import { SubDAOData } from "@/types/SubDAO"
import { useSubDAOList } from '@/hooks';

export const getStaticProps = async () => {
  return { props: {} }
}

// mock
const topLinks = [
  { type: "link", path: '/dao/create', label: "Create DAO" },
  { type: "link", path: '/dao/create/signup_mint_nft', label: "Signup DAO" },
]

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  const subDAOList = useSubDAOList()
  const displayDAOData = (SubDAOAddress: string) => {
    const target = subDAOList?.find(subDAO => subDAO.daoAddress === SubDAOAddress)
    setTargetSubDAO(target)
  }
  return (
    <>
      <div className='block'>
        {
          topLinks.map((link) => {
            return (
              <Link
                href={link.path}
                key={link.path}>
                <a
                  className="button-dao-default text-xl p-4 m-4"
                >
                  {link.label}
                </a>
              </Link>
            )
          })
        }
      </div>
      <div className='mt-5 p-5'>
        <h2 className="">List of Sub DAOs to which you belong</h2>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">            
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">          
            {typeof subDAOList !== "undefined" ?
              subDAOList.map((dao) => {
                return (
                  <>                    
                    <div
                      className="bg-black my-2 border border-gray-700 hover:border-gray-500 max-w-sm rounded overflow-hidden shadow-lg"
                      onMouseEnter={() => displayDAOData(dao.daoAddress)}
                    >
                      <div className="px-6 py-2">
                        <div className="text-xl mb-2">{dao.daoName}</div>                  
                      </div>
                      <hr className='p-1 border-gray-700' />
                      <div className="py-2 flex">
                        <Link href={""}>
                          <a
                            className="inline-flex button-dao-default text-sm py-1 px-3"
                          >
                              Members
                          </a>
                        </Link>                        
                        <Link href={""}>
                          <a
                            className="inline-flex button-dao-default text-sm py-1 px-3"
                          >
                            Proposals
                          </a>
                        </Link>                        
                      </div>
                    </div>
                  </>
                )
              }) : ""
            }
            </div>
          </div>
        </div>
      </div>


      <div className='mt-5'>
        {typeof targetSubDAO !== "undefined" ? (
          <div>
            <p>Name: {targetSubDAO.daoName}</p>
            <p>Github URL: {targetSubDAO.githubURL}</p>
          </div>
        ) : ""}
      </div>
    </>

  )
}
Home.Layout = Layout
export default Home
