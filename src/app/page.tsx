"use client"
import LeftPanel from "@/components/home/left-panel";
import RightPanel from "@/components/home/right-panel";
import { useConversationStore } from "@/store/chat-store";
import { useTheme } from "next-themes";

export default function Home() {

	const {setSelectedConversation, selectedConversation} = useConversationStore()
	
	return (
		<main className='m-1 '>
			<div className='flex flex-col md:flex-row overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel'>
				{/* Green background decorator for Light Mode */}
				<div className='fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30' />
				<LeftPanel />
				<RightPanel />
			</div>
		</main>
	);
}