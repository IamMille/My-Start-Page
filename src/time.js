//gör det här anropet för att plocka ut Key 
    
    class BringApiKey extends React.Component {
        constructor(props) {
            super(props);
                this.state= {
                    countryName: "Sweden",
                    zoneName:"Europe\/Stockholm",
                    gmtOffset: 7200,
                    timestamp: 0
                };
            this.api = this.api.bind(this);
      
        }        
       componentDidMount() {
           //this.api()*/
        //(function () {setInterval(api(), 1000);})()
        setInterval(this.api, 3000);
       }
       
          api(){
              console.log("api")
              var url1 = "http://api.timezonedb.com/v2/get-time-zone?key=FPYC4024VFCA&format=json&by=zone&zone=Europe/Stockholm";
            
            var req1= new XMLHttpRequest();
            req1.onreadystatechange= () => {
                console.log("kjh", req1.status, req1.readyState)
                if(req1.status === 200 && req1.readyState == 4){
                    console.log("js")
                    var json1= JSON.parse(req1.responseText);
                    console.log(json1);
                    this.setState({
                        
                        timestamp: json1.formatted
                    })
                }
                console.log("json1", json1);
            }
        req1.open('get', url1);
        req1.send(); 
          }  
        
         render() {
             console.log("ok")
            return(
                <div> 
                    {this.state.timestamp}
                </div>
            );
        }
        
     
}
     //BringApiKey
ReactDOM.render(
     <BringApiKey/>,
        document.getElementById('app-root')
    );






