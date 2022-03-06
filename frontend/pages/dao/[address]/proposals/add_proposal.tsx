import { Layout } from "@/components/common";
import { AddProposalFormData } from "@/types/Proposal";
import { useState } from "react";
import { registerProposal } from "contracts/SubDAO";
import { FormInputText, FormInputSelect } from "@/components/ui";
import { useRouter } from "next/router";

const AddProposal = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string

  const [proposalId, setPoposalId] = useState("");
  const [formValue, setFormValue] = useState<AddProposalFormData>({
    proposalKind: 0,
    title: "",
    outline: "",
    detail: "",
    githubURL: "",
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    console.log(formValue)
  };
  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    console.log(formValue)
  };
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    console.log(formValue)
  };

  const onSubmitAddProposalForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // console.log("#### Submit 1");
    event.preventDefault();
    const proposalId = await registerProposal(subDAOaddress, formValue);
    if (proposalId !== "") {
      setPoposalId(proposalId);
    }
  };

  const proposalKind = [
    { value: 0, key: "Add A Member" },
    { value: 1, key: "Delete A Member" },
    { value: 2, key: "Use Of Funds" },
    { value: 3, key: "Community Management" },
    { value: 4, key: "Activities" },

  ]
  return (
    <>
      <div>
        <h1 className="text-3xl">Add A Proposal</h1>
        <div className="p-5"></div>
        <form
          className="w-full max-w-screen-sm"
          onSubmit={onSubmitAddProposalForm}
        >
          <FormInputSelect
            label='Proposal Kind'
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="proposalKind"
            handleOnChangeSelect={onChangeSelect}
            selectList={proposalKind}
            optionLabelKey={"key"}
            optionValueKey={"value"}
            itemName={"Proposal Kind"}
          />
          <FormInputText
            label="Title"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			  	leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="title"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label="Outline"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="outline"
            handleOnChangeTextArea={onChangeTextArea}
            isTextArea={true}
          />
          <FormInputText
            label="Detail"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="detail"
            handleOnChangeTextArea={onChangeTextArea}
            isTextArea={true}
          />
          <FormInputText
            label="Github URL"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
			    leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="githubURL"
            handleOnChangeInput={onChangeInput}
          />
          <div className="p-5">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				font-bold py-2 px-4 rounded"
                type="submit"
              >
                Add a Proposal
              </button>
            </div>
          </div>
          <p className="text-sm p-5">
            Your Proposal Accept With The Proposal ID : [ {proposalId} ]
          </p>
        </form>
      </div>
    </>
  );
};

AddProposal.Layout = Layout;
export default AddProposal;
