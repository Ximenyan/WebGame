// Copyright 2013 Beego Samples authors
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

package controllers

import (
	"WebGame/models"
	"WebGame/models/player"

	"github.com/astaxie/beego"
	"github.com/gorilla/websocket"
)

type Subscription struct {
	Archive []models.Event      // All the events from the archive.
	New     <-chan models.Event // New events coming in.
}

func newEvent(ep models.EventType, user, msg string) models.Event {
	return models.CreateEvent(ep, user) //models.Event{ep, user, int(time.Now().Unix()), msg}
}

func Join(user string, ws *websocket.Conn) {
	subscribe <- Subscriber{Name: user, Conn: ws}
}

func Leave(user string) {
	unsubscribe <- user
}

type Subscriber struct {
	Name string
	Conn *websocket.Conn // Only for WebSocket users; otherwise nil.
}

var (
	// Channel for new join users.
	subscribe = make(chan Subscriber, 10)
	// Channel for exit users.
	unsubscribe = make(chan string, 10)
	// Send events here to publish them.
	publish = make(chan models.Event, 10)

	G_players = make(map[string]Subscriber)
)

// This function handles all incoming chan messages.
func chatroom() {
	for {
		select {
		case sub := <-subscribe: //player 上线
			if _, ok := G_players[sub.Name]; ok {
				delete(G_players, sub.Name)
			}
			G_players[sub.Name] = sub
			player.AddGPlayer(sub.Name, sub.Name)
			//player.Reload()
			publish <- newEvent(models.EVENT_JOIN, sub.Name, "")
			beego.Info("New user:", sub.Name, ";WebSocket:", sub.Conn != nil)
		case event := <-publish: //收到client 事件

			BroadcastWebSocket(event)
			models.NewArchive(event)

			if event.Type == models.EVENT_MESSAGE {
				beego.Info("Message from", event.User, ";Content:", event.Content)
			}
		case unsub := <-unsubscribe: //player 下线
			delete(G_players, unsub)
		}
	}
}

func init() {
	go chatroom()
}
