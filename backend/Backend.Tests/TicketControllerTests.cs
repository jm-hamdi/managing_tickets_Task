using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using backend.Controllers;
using backend.Models;
using backend.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Tests
{
    [TestFixture]
    public class TicketControllerTests
    {
        private TicketController _controller;
        private Mock<TicketContext> _mockContext;

        [SetUp]
        public void Setup()
        {
            _mockContext = new Mock<TicketContext>();
            _controller = new TicketController(_mockContext.Object);
        }

        [Test]
        public async Task GetTickets_ReturnsOkResult_WithTickets()
        {
            // Arrange
            var tickets = new List<Ticket>
            {
                new Ticket { TicketId = 1, Description = "Test Ticket", Status = "Open", Date = DateTime.Now }
            };

            _mockContext.Setup(m => m.Tickets).ReturnsAsync(tickets);

            // Act
            var result = await _controller.GetTickets();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnTickets = Assert.IsType<List<Ticket>>(okResult.Value);
            Assert.Single(returnTickets);
        }

        [Test]
        public async Task GetTicket_ReturnsNotFound_WhenTicketDoesNotExist()
        {
            // Arrange
            int ticketId = 999; // Non-existing ticket id
            _mockContext.Setup(m => m.Tickets.FindAsync(ticketId)).ReturnsAsync((Ticket)null);

            // Act
            var result = await _controller.GetTicket(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task PostTicket_CreatesTicket_ReturnsCreatedResult()
        {
            // Arrange
            var newTicket = new Ticket { Description = "New Ticket", Status = "Open", Date = DateTime.Now };
            _mockContext.Setup(m => m.Tickets.AddAsync(newTicket, default)).ReturnsAsync(newTicket);

            // Act
            var result = await _controller.PostTicket(newTicket);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(newTicket.Description, ((Ticket)createdResult.Value).Description);
        }

        [Test]
        public async Task PutTicket_UpdatesTicket_ReturnsNoContent()
        {
            // Arrange
            var existingTicket = new Ticket { TicketId = 1, Description = "Updated Ticket", Status = "Open", Date = DateTime.Now };
            _mockContext.Setup(m => m.Tickets.FindAsync(existingTicket.TicketId)).ReturnsAsync(existingTicket);

            // Act
            var result = await _controller.PutTicket(existingTicket.TicketId, existingTicket);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteTicket_RemovesTicket_ReturnsNoContent()
        {
            // Arrange
            int ticketId = 1;
            var existingTicket = new Ticket { TicketId = ticketId, Description = "Ticket to be deleted", Status = "Open", Date = DateTime.Now };
            _mockContext.Setup(m => m.Tickets.FindAsync(ticketId)).ReturnsAsync(existingTicket);

            // Act
            var result = await _controller.DeleteTicket(ticketId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteTicket_ReturnsNotFound_WhenTicketDoesNotExist()
        {
            // Arrange
            int ticketId = 999; // Non-existing ticket id
            _mockContext.Setup(m => m.Tickets.FindAsync(ticketId)).ReturnsAsync((Ticket)null);

            // Act
            var result = await _controller.DeleteTicket(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        // More tests can be added as needed...
    }
}
