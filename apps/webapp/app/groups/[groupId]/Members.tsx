import { SBGroup } from "@/utils/api/_types";
import { Button } from "@repo/ui/components/ui/button";

const Members = ({group}: {group: SBGroup}) => {
  return <div className="flex flex-col gap-2">
    {group.group_members.length === 0 && (
      <div className="bg-muted p-8 text-center rounded-md">
        <h3>No members created yet</h3>
        <Button>Add a member</Button>
      </div>
    )}
    {group.group_members.map(gm => {
      return <div key={gm.user_id} className="flex justify-between items-center bg-muted p-4 rounded-lg">
        <div className="flex gap-2">
          <p>{gm.profiles?.username || `User ${gm.user_id}`}</p>
          {group.owner_id === gm.user_id && <p>(Admin)</p>}
          <p className="font-mono">{gm.user_id.slice(-4)}</p>
        </div>
      </div>
    })}
  </div>;
}

export default Members;