# CodeJam14

# IDEA: Rates how "real" reviews are. Also shows "real" review (after adjustments). 


Files: 
    1 - GUI page (HTML/CSS)
    2 - 


# TODO: 
     1 - Scrape Data from webpage 
        -> Instant data scraper (send data as CSV or JSON)
        -> Parse data in backend 
        -> Send to AI detector

        HOW TO DO: 
                - Priority queue (review 5 stars first AND review length (short = suspicious) )
                - Sort Data


    2 - AI detection API integration (GPTZero) 
        -> Receive data from scraper   
        -> Processes data 
        -> Create new column to CSV (Grade received from GPTZero -> Updates GUI)
        -> Outputs grade to frontend

    
        Return? 
            - Grade (letter & percentage)

        Flags: 
            - Same date reviews
            - 5 stars + no comment 
            - 5 stars + small comment

     3 - Chrome extension UI
        -> Check grade to determine color 
        -> Hazard comment section 
        -> Show percentage and letter grade

        TODO:
            -> (on appear, pop out letter grade)
            -> (find % grade font)
            -> Hazard section (Louis)
            -> Background gradient 
            -> Pie Chart
            -> Change percentage
            -> Find font percentage grade
            -> Logo
            -> Spin card ( logo on back )
            -> Clear background
        

     **- How GUI interacts with backend
        ->
        ->
        
    
