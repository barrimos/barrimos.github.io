1. การทำงานของ HEAD และ Branch ต่างๆ
HEAD เป็นตัวชี้ตำแหน่ง commit ปัจจุบันใน branch ที่กำลังทำงานอยู่.
Branch ใน Git เป็นเพียง pointer ที่ชี้ไปยัง commit หนึ่งๆ และอัปเดตตำแหน่งเมื่อมี commit ใหม่.
เมื่อ clone โปรเจคจาก remote repository:
จะได้ branch ชื่อ origin/main ที่ชี้ไปยัง commit ล่าสุดของ remote.
HEAD จะชี้ไปยัง branch main (local branch) หลังจาก checkout.
2. การ Commit และ Checkout
ทุกครั้งที่ commit ใหม่:
HEAD จะชี้ไปที่ commit ล่าสุดของ branch ปัจจุบัน.
หากทำงานบน branch local เช่น main การ commit จะสร้าง commit ใหม่ใน branch นั้น.
การสร้าง branch ใหม่ เช่น git checkout -b bugFix:
จะสร้าง branch ใหม่ที่ชี้ไปยัง commit เดียวกับ branch ที่ checkout ก่อนหน้า.
ทำให้สามารถแยกงาน เช่น การแก้บั๊ก ออกจาก branch หลักได้.
3. Merge และ Rebase
Merge:
ใช้รวมการเปลี่ยนแปลงจาก branch หนึ่งเข้ามาในอีก branch.
จะเกิด "merge commit" เพื่อแสดงว่ารวม branch สอง branch เข้าด้วยกัน.
Rebase:
ใช้ย้ายฐาน (base) ของ branch ไปต่อท้าย commit อื่น.
ทำให้ history ดูเรียบร้อยกว่า (ไม่มี merge commit).
Rebase ไม่ได้เปลี่ยนแปลง branch ที่ถูก rebase แต่ย้าย commit ไปต่อ branch ใหม่.
4. Cherry-pick
ใช้คัดลอก commit หนึ่งๆ จาก branch อื่นมาวางใน branch ปัจจุบัน.
เหมาะสำหรับนำการเปลี่ยนแปลงบางส่วนจาก branch อื่นมาใช้ โดยไม่ต้องรวม branch ทั้งหมด.
5. การลบ Commit และ Branch
Commit หรือ branch ที่ถูกลบไปแล้วยังสามารถกู้คืนได้ถ้ายังมีใน git reflog.
คำสั่งที่เกี่ยวข้อง:
git branch -d <branch>: ลบ branch.
git reset หรือ git revert: ย้อน commit หรือสร้าง commit ใหม่เพื่อลบการเปลี่ยนแปลง.
git reflog: ดูประวัติ HEAD และ commit ที่เคยถูกอ้างถึง.
6. Remote Branch
origin/main หมายถึง branch main ใน remote repository.
Branch local เช่น main สามารถอัปเดตข้อมูลจาก remote ด้วย git fetch หรือ git pull.
git push ต้องการอ้างอิง remote branch เช่น git push origin main.
7. การแก้ไข Commit
git commit --amend:
ใช้แก้ไขข้อความหรือรวมการเปลี่ยนแปลงใหม่กับ commit ล่าสุด.
ควรใช้อย่างระมัดระวังหาก commit นั้นถูก push ไปยัง remote แล้ว.
8. PR (Pull Request)
PR คือขั้นตอนที่ใช้ใน platform เช่น GitHub หรือ GitLab เพื่อเสนอการรวม branch หนึ่งไปยัง branch อื่น.
แม้ว่า Git เองจะไม่บังคับ PR การ merge branch สามารถทำได้ด้วย git merge.
9. คำถามเพิ่มเติม
git branch -f bug main:
ใช้ย้าย branch bug ไปยัง commit เดียวกับ branch main.
การ commit ใน branch bug และ merge กลับไปที่ main:
Branch main จะได้รับ commit จาก bug.
1. การเริ่มต้นใช้งาน Git
git init: ใช้ในการสร้าง repository ใหม่ในโฟลเดอร์ปัจจุบัน.
git clone <url>: ใช้ในการโคลน repository จาก remote มาใช้งานในเครื่องของเรา.
2. การจัดการ Branch
git branch: ใช้ในการแสดงรายการ branch ที่มีอยู่ใน repository ปัจจุบัน.
git branch <branch_name>: ใช้ในการสร้าง branch ใหม่.
git checkout <branch_name>: ใช้ในการสลับไปยัง branch ที่ต้องการ.
git checkout -b <branch_name>: ใช้ในการสร้าง branch ใหม่และสลับไปที่ branch นั้นทันที.
git branch -d <branch_name>: ใช้ในการลบ branch.
3. การ Commit
git add <file_name>: ใช้ในการเพิ่มไฟล์ที่แก้ไขแล้วลงใน staging area.
git commit -m "message": ใช้ในการบันทึกการเปลี่ยนแปลงใน repository พร้อมกับข้อความอธิบาย.
git status: ใช้ในการตรวจสอบสถานะของไฟล์ (ว่ามีไฟล์ที่ยังไม่ได้ commit หรือไม่).
git diff: ใช้ดูความแตกต่างของไฟล์ที่มีการเปลี่ยนแปลง.
4. การเชื่อมต่อกับ Remote Repository
git remote add origin <url>: ใช้ในการเชื่อมต่อ repository ท้องถิ่นกับ remote repository.
git push -u origin <branch_name>: ใช้ในการส่งการเปลี่ยนแปลงจาก local branch ไปยัง remote branch.
git pull origin <branch_name>: ใช้ในการดึงการเปลี่ยนแปลงจาก remote branch มายัง local branch.
git fetch: ใช้ในการดึงข้อมูลจาก remote repository แต่ไม่รวมการ merge การเปลี่ยนแปลง.
5. การ Merge
git merge <branch_name>: ใช้ในการรวมการเปลี่ยนแปลงจาก branch หนึ่งไปยังอีก branch (เช่นจาก feature ไปยัง main).
git merge --no-ff <branch_name>: ใช้ในการทำ merge โดยไม่ใช้ fast-forward (จะทำให้เกิด merge commit).
6. การ Rebase
git rebase <branch_name>: ใช้ในการนำ commit จาก branch ปัจจุบันไปต่อท้าย commit ของ branch อื่น (ปรับให้ประวัติการ commit เป็นเส้นตรง).
git rebase -i: ใช้ในโหมด interactive rebase ซึ่งช่วยให้เราเลือก commit และแก้ไข หรือจัดการกับ commit ได้.
git rebase --continue: ใช้เมื่อเกิด conflict และเราต้องการให้การ rebase ดำเนินต่อไปหลังจากที่เราแก้ไข conflict แล้ว.
git rebase --abort: ใช้ในการยกเลิกการ rebase และย้อนกลับสถานะก่อนการ rebase.
7. การดูประวัติ Commit
git log: ใช้ในการแสดงประวัติ commit.
git log --oneline: ใช้ในการแสดงประวัติ commit แบบย่อๆ (หนึ่งบรรทัดต่อหนึ่ง commit).
git reflog: ใช้ในการดูประวัติการใช้งาน Git โดยรวม (สามารถดูการเคลื่อนไหวของ HEAD ได้).
8. การแก้ไข Commit
git commit --amend: ใช้ในการแก้ไข commit ล่าสุด (สามารถเปลี่ยนแปลงข้อความ commit หรือรวมไฟล์ใหม่เข้าไป).
git reset <commit_id>: ใช้ในการย้อนกลับไปยัง commit ที่ต้องการ (สามารถใช้ --soft, --mixed, หรือ --hard ขึ้นอยู่กับว่าเราต้องการเก็บการเปลี่ยนแปลงหรือไม่).
9. การลบและย้อนกลับ Commit
git reset --hard <commit_id>: ใช้ในการลบ commit และเปลี่ยนแปลงทั้งหมดตั้งแต่ commit นั้น (จะทำให้ไฟล์ใน working directory ถูกลบ).
git reset --soft <commit_id>: ใช้ในการย้อนกลับ commit แต่จะเก็บการเปลี่ยนแปลงใน staging area ไว้.
10. การดูสถานะของ Repository
git status: ใช้ในการตรวจสอบสถานะของไฟล์ใน repository ว่ามีการเปลี่ยนแปลงอะไรบ้าง.
git diff: ใช้ในการดูความแตกต่างระหว่าง commit, branch, หรือการเปลี่ยนแปลงในไฟล์.
11. การทำงานกับ Conflicts
การเกิด conflict: เมื่อเราทำการ merge หรือ rebase และ Git ไม่สามารถทำการรวมการเปลี่ยนแปลงได้เอง (เช่นการแก้ไขไฟล์เดียวกันในทั้งสอง branch) จะทำให้เกิด conflict.
การแก้ไข conflict: เราต้องไปแก้ไขไฟล์ที่เกิด conflict แล้วทำการ git add เพื่อบอกว่าได้แก้ไข conflict แล้ว จากนั้นใช้ git merge --continue หรือ git rebase --continue เพื่อต่อการทำงาน.
12. การทำงานกับ Tags
git tag <tag_name>: ใช้ในการสร้าง tag ใหม่.
git push origin <tag_name>: ใช้ในการ push tag ไปยัง remote repository.
git tag -d <tag_name>: ใช้ในการลบ tag.
13. การทำงานกับ Stashing
git stash: ใช้ในการเก็บการเปลี่ยนแปลงที่ยังไม่ commit ไปไว้ใน stash (เหมือนการเก็บการทำงานชั่วคราว).
git stash apply: ใช้ในการเรียกคืนการเปลี่ยนแปลงจาก stash.
git stash pop: ใช้ในการเรียกคืนการเปลี่ยนแปลงจาก stash แล้วลบการเก็บนั้นออกจาก stash.
สรุปการใช้งาน Git
Git เป็นเครื่องมือที่สำคัญในการจัดการเวอร์ชันของโค้ด โดยมีฟังก์ชันที่ช่วยให้การพัฒนาโค้ดสะดวกและสามารถทำงานร่วมกับคนอื่นได้ง่าย โดยคำสั่งต่างๆ เช่น git commit, git branch, git merge, git rebase, และ git push ทำให้สามารถทำงานกับโค้ดที่มีการเปลี่ยนแปลงได้อย่างมีระเบียบและสามารถจัดการประวัติการเปลี่ยนแปลงได้

