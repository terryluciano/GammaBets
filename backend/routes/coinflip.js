const router = require("express").Router();
const express = require('express');

const { allCFGames, cfHistory, joiningQueue, pastCFSides } = require("../gammabets/handler/coinflip-handler")

router.post("/coinflip/active", (req, res) => {

	const sender = [];

	allCFGames.forEach(obj => {
		
		const entry = {
			game: obj.game,
			timer: obj.timer
		}

		sender.push(entry);

	});

	res.json(sender);

});

router.post("/coinflip/history", (req, res) => {
	
	console.log("grabbing current cf history")

	const sender = {
		topGame: cfHistory.topGame,
		history: cfHistory.history
	}

	res.json(sender);

});

router.post("/coinflip/joining-queue", (req, res) => {
	
	console.log("grabbing current cf joining queue")
	res.json(joiningQueue.queue);

});

router.post("/coinflip/past-sides", (req, res) => {
	
	console.log("getting past cf winning sides")
	const data = {
		past: pastCFSides
	};
	res.json(data);

});

module.exports = router;