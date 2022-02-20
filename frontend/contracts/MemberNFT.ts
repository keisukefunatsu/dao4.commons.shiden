import Web3 from 'web3'
import {ethers} from 'ethers'
import {MemberERC721ContractConstruct} from '@/contracts/construct'
import {MemberNFTDeployFormData} from '@/types/MemberNFT'

export const deployMemberNFT = async (
  inputData: MemberNFTDeployFormData
): Promise<string> => {
  let memberNFTTokenAddress = ''
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      MemberERC721ContractConstruct.abi,
      MemberERC721ContractConstruct.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.token_uri,
        inputData.subdao_address
      )
      .then((res: any) => {
        console.log(res)
        alert('Succeeded to deploy member NFT contract')
        memberNFTTokenAddress = res.address
        return memberNFTTokenAddress
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to deploy member NFT contract')
      })
  }
  return memberNFTTokenAddress
}

export const mintMemberNFT = async (memberNFTTokenAddress: string) => {
  if (
    typeof window.ethereum !== 'undefined' &&
    typeof memberNFTTokenAddress !== 'undefined'
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const contract = new ethers.Contract(
      memberNFTTokenAddress,
      MemberERC721ContractConstruct.abi,
      signer
    )

    contract
      .original_mint(signerAddress, {value: Web3.utils.toWei('10')})
      .then((d: any) => {
        console.log(d)
        alert('Succeeded to mint first NFT!')
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to mint first NFT!')
      })
  }
  return
}
