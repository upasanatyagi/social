//asyn function newest,generator function
//you label asyn function and returns the promise with resolved value
//
const dbl = n =>
    new Promise((rslv, rjct) =>
        setTimeout(
            () => (isNaN(n) ? rjct(new Error("Bad Number")) : rslv(n * 2)),
            1500
        )
    );

async function fn() {
    var x = await dbl(10);
    console.log(x);
    return x;
    // return 10;
}

// console.log(fn);
fn()
    .then(console.log)
    .catch(() => console.log("caught"));

async function getTweets() {
    const token = await twitter.getToken().catch(function() {
        return config.savedToken;
    });
    let tweetsl;
    try {
        tweets = await twitter.getTweets(token);
    } catch (e) {
        tweets = ["nonsense"];
    }
    //filter tweets
}

class App extends React.Component {
    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
        // axios.get('/user').then(
        //     ({data})=>{
        //         this.setState(data)
        //     }
        // )
    }
}
app.get("/user", async (req, res) => {
    try {
        const { rows } = await db.getUserById(req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    // db.getUserById(req.session.userId).then(
    //     ({rows}) => res.json(rows[0])
    // )
});

exports.getUserById = async id => {
    const { rows } = db.query(`SELECT FROM user`, [id]);
    return rows[0];
};
