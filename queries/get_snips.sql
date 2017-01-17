#generic for now
#LATER update and add following functionality and such shenanigans

select   c.collection_name, s.snip_text, DATE_FORMAT(s.createdon, '%m/%d/%Y %H:%M%p') as createdon 
from     collection c 
join     snip_info s on s.collection_id = c.collection_id 
where    c.approved = 1 
         and s.approved = 1 
order by s.createdon;
