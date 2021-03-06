package kdkbot.commands.counters;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import kdkbot.Kdkbot;
import kdkbot.MessageInfo;
import kdkbot.commands.Command;
import kdkbot.filemanager.Config;

public class Counters extends Command {
	public ArrayList<Counter> counters;
	private String channel;
	private Config config;
	
	public Counters(String channel) {
		try {
			this.channel = channel;
			this.config = new Config("./cfg/" + channel + "/counters.cfg");
			this.counters = new ArrayList<Counter>();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void loadCounters() {
		try {
			if (counters.size() > 0) { counters.clear(); } // Clear counters if needed
			
			Kdkbot.instance.dbg.writeln(this, "Starting load process...");
			List<String> strings = config.getConfigContents();
			Kdkbot.instance.dbg.writeln(this, "Loaded contents. Size: " + strings.size());
			Iterator<String> string = strings.iterator();
			while(string.hasNext()) {
				String str = string.next();
				Kdkbot.instance.dbg.writeln(this, "Parsing next string: " + str);
				String[] args = str.split("\\|");
				Kdkbot.instance.dbg.writeln(this, "Size of args: " + args.length);
				for(int i = 0; i < args.length; i++) {
					Kdkbot.instance.dbg.writeln(this, "args[" + i + "] is " + args[i]);
				}
				counters.add(new Counter(args[0], Integer.parseInt(args[1])));
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void addCounter(String name, int value) {	
		counters.add(new Counter(name, value));
	}
	
	public void removeCounter(String name) {
		Iterator<Counter> cntrIter = counters.iterator();
		while(cntrIter.hasNext()) {
			Counter cntr = cntrIter.next();
			if(cntr.name.equalsIgnoreCase(name)) {
				counters.remove(cntr);
				break;
			}
		}
	}
	
	public void saveCounters() {
		try {
			Iterator<Counter> countersIter = this.counters.iterator();
			List<String> toSave = new ArrayList<String>();
			
			while(countersIter.hasNext()) {
				Counter curCounter = countersIter.next();
				toSave.add(curCounter.name + "|" + curCounter.value);
			}
			config.saveSettings(toSave);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void executeCommand(MessageInfo info) {
		String[] args = info.getSegments();
		
		Iterator<Counter> cntrIter = this.counters.iterator();
		Counter cntr;
		
		if(args.length == 1) return;
		
		int amount = 1;
		if(args.length > 3) {
			amount = Integer.parseInt(args[3]);
		}
		
		switch(args[1]) {
			case "new":
				if(info.senderLevel >= 2) {
					if(args.length > 3) {
						this.addCounter(args[2], amount);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.new.value", args[2], args[3]);
					} else {
						this.addCounter(args[2], 0);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.new", args[2], args[3]);
					}
				}
				break;
			case "delete":
			case "remove":
				if(info.senderLevel >= 2) {
					this.removeCounter(args[2]);
					Kdkbot.instance.sendChanMessageTrans(channel, "counter.del", args[2]);
				}
				break;
			case "+":
			case "add":
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					if(cntr.name.equalsIgnoreCase(args[2])) {
						cntr.addValue(amount);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.mod.add", args[2], amount, cntr.value);
					}
				}
				break;
			case "-":
			case "sub":
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					if(cntr.name.equalsIgnoreCase(args[2])) {
						cntr.subtractValue(amount);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.mod.sub", args[2], amount, cntr.value);
					}
				}
				break;
			case "*":
			case "mult":
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					if(cntr.name.equalsIgnoreCase(args[2])) {
						cntr.multiplyValue(amount);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.mod.mul", args[2], amount, cntr.value);
					}
				}
				break;
			case "/":
			case "divide":
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					if(cntr.name.equalsIgnoreCase(args[2])) {
						cntr.divideValue(amount);
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.mod.div", args[2], amount, cntr.value);
					}
				}
				break;
			case "=":
			case "get":
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					if(cntr.name.equalsIgnoreCase(args[2])) {
						Kdkbot.instance.sendChanMessageTrans(channel, "counter.mod.get", cntr.name, cntr.value);
					}
				}
				break;
			case "list":
				String out = "";
				while(cntrIter.hasNext()) {
					cntr = cntrIter.next();
					out += cntr.name +"=" + cntr.value + " ";
				}
				Kdkbot.instance.sendChanMessage(channel, out);
				break;
			
		}
		this.saveCounters();
	}
}
