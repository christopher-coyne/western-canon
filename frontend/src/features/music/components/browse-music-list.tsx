import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"
import { useGetRecommendations } from "../api/get-all-recommendations";
export const BrowseMusicList = () => {
    const discussionsQuery = useGetRecommendations({
        page: 1,
    });
    console.log('discussions query ', discussionsQuery.data?.data)
    const cardInfos = [
        { id: "123", name: "Skate Punk Playlist", derivedFrom: ['Millencolin', 'Black Flag', 'Suicidal Tendencies'], date: '07/24/2024', creator: "Chris C" },
        { id: "1234", name: "Skate Punk Playlist", derivedFrom: ['Millencolin', 'Black Flag', 'Suicidal Tendencies'], date: '07/24/2024', creator: "Chris C" },
        { id: "1235", name: "Skate Punk Playlist", derivedFrom: ['Millencolin', 'Black Flag', 'Suicidal Tendencies'], date: '07/24/2024', creator: "Chris C" },
    ]

    return (<div className="w-full">
        <div>Search</div>
        <Input />
        <div>Results</div>
        <div className="flex flex-col gap-4">
            {cardInfos.map(card => <div className="p-4 flex flex-col gap-2 bg-surface rounded-lg" key={card.id}>
                <div className="text-xl flex gap-2 items-center"> <Heart />{card.name}</div>
                <p>Inspired by: {card.derivedFrom.map(band => band)}</p>
            </div>)}
        </div>
    </div>)
}