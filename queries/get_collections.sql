#generic for now
#LATER update and add following functionality and such shenanigans

select   c.collection_id, c.collection_name 
from     collection c 
where    c.approved = 1 
order by c.collection_name;
