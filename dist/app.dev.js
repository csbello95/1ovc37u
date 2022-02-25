"use strict";

var express = require("express");

var mongoose = require("mongoose");

var Note = require("./models/Note");

var path = require("path");

var md = require("marked");

var PageView = require("./models/PageView.js");

var browser = require("browser-detect");

var app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/notes", {
  useNewUrlParser: true
});
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.urlencoded({
  extended: true
}));
app.use("/assets", express["static"](path.join(__dirname, "assets")));

var createPageView = function createPageView(req, res, next) {
  var data, pageView;
  return regeneratorRuntime.async(function createPageView$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            path: req.originalUrl,
            date: Date.now(),
            userAgent: browser(req.headers["user-agent"]).name
          };
          pageView = new PageView(data);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(pageView.save());

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", next(_context.t0));

        case 10:
          next();

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 7]]);
};

app.get("/", createPageView, function _callee(req, res, next) {
  var notes;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Note.find());

        case 2:
          notes = _context2.sent;
          res.render("index", {
            notes: notes
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/notes/new", createPageView, function _callee2(req, res) {
  var notes;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Note.find());

        case 2:
          notes = _context3.sent;
          res.render("new", {
            notes: notes
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/notes", function _callee3(req, res, next) {
  var data, note;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = {
            title: req.body.title,
            body: req.body.body
          };
          note = new Note(req.body);
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(note.save());

        case 5:
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", next(_context4.t0));

        case 10:
          res.redirect("/");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 7]]);
});
app.get("/notes/:id", createPageView, function _callee4(req, res) {
  var notes, note;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Note.find());

        case 2:
          notes = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Note.findById(req.params.id));

        case 5:
          note = _context5.sent;
          res.render("show", {
            notes: notes,
            currentNote: note,
            md: md
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/notes/:id/edit", createPageView, function _callee5(req, res, next) {
  var notes, note;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Note.find());

        case 2:
          notes = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(Note.findById(req.params.id));

        case 5:
          note = _context6.sent;
          res.render("edit", {
            notes: notes,
            currentNote: note
          });

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.patch("/notes/:id", function _callee6(req, res) {
  var id, note;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Note.findById(id));

        case 3:
          note = _context7.sent;
          note.title = req.body.title;
          note.body = req.body.body;
          _context7.prev = 6;
          _context7.next = 9;
          return regeneratorRuntime.awrap(note.save());

        case 9:
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](6);
          return _context7.abrupt("return", next(_context7.t0));

        case 14:
          res.status(204).send({});

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[6, 11]]);
});
app["delete"]("/notes/:id", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Note.deleteOne({
            _id: req.params.id
          }));

        case 2:
          res.status(204).send({});

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/analytics", createPageView, function _callee8(req, res) {
  var pageViews;
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(PageView.aggregate([{
            $group: {
              _id: "$path",
              visits: {
                $sum: 1
              }
            }
          }]));

        case 2:
          pageViews = _context9.sent;
          console.log(pageViews);
          res.render("analytics", {
            pageViews: pageViews
          });

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.listen(3000, function () {
  return console.log("Listening on port 3000 ...");
});